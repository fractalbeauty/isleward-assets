import { xxh64 } from "@node-rs/xxhash";
import canonicalize from "canonicalize";
import chalk from "chalk";
import fs from "fs/promises";
import { Jimp } from "jimp";
import { exit } from "process";
import { parseArgs } from "util";
import { SPRITESHEET_CONFIGS } from "./config";
import {
  DEFAULT_LOCKFILE,
  lockfileSchema,
  type Lockfile,
  type Manifest,
  type SpritesheetConfig,
  type SpritesheetManifest,
} from "./schema";

const info = (...args: unknown[]) => {
  console.log(chalk.cyan(...args));
};
const warn = (...args: unknown[]) => {
  console.log(chalk.yellow(...args));
};
const error = (...args: unknown[]) => {
  console.log(chalk.red(...args));
};

const getSpritesheetDirectory = (config: SpritesheetConfig) =>
  `./public/assets/${config.id}`;

const getSpritesheetPath = (config: SpritesheetConfig) =>
  `./public/assets/${config.id}/${config.id.replaceAll("/", "_")}.png`;

const getSpritesheetPartPath = (
  config: SpritesheetConfig,
  x: number,
  y: number
) =>
  `./public/assets/${config.id}/${config.id.replaceAll(
    "/",
    "_"
  )}_${x}_${y}.png`;

const getSpritePath = (name: string) => `./public/sprites/${name}.png`;

const downloadSpritesheet = async (config: SpritesheetConfig) => {
  info(`Downloading "${config.id}" from ${config.url}`);

  await fs.mkdir(getSpritesheetDirectory(config), { recursive: true });

  const res = await fetch(config.url);
  if (res.status !== 200) {
    error(
      `Download failed for "${config.id}" (${config.url}), status not ok: ${res.status}`
    );
    throw new Error(`Download failed`);
  }
  const bytes = new Uint8Array(await res.arrayBuffer());
  await fs.writeFile(getSpritesheetPath(config), bytes);

  // hash file and return the hash
  const hash = xxh64(bytes).toString(16);
  return {
    hash,
  };
};

type JimpImage = Awaited<ReturnType<typeof Jimp.read>>;

const splitSpritesheetPart = async (
  sheet: SpritesheetConfig,
  sheetImage: JimpImage,
  x: number,
  y: number
) => {
  const offsetX = x * sheet.size;
  const offsetY = y * sheet.size;

  const spriteImage = new Jimp({ width: sheet.size, height: sheet.size });
  for (let xx = 0; xx < sheet.size; xx++) {
    for (let yy = 0; yy < sheet.size; yy++) {
      const color = sheetImage.getPixelColor(xx + offsetX, yy + offsetY);
      spriteImage.setPixelColor(color, xx, yy);
    }
  }

  await spriteImage.write(getSpritesheetPartPath(sheet, x, y) as any);
};

const splitSpritesheet = async (config: SpritesheetConfig) => {
  info(`Splitting "${config.id}"`);

  const image = await Jimp.read(getSpritesheetPath(config));

  if (image.width % config.size !== 0) {
    warn(
      `Spritesheet ${config.id} with size ${config.size} has non-multiple width of ${image.width}`
    );
  }
  if (image.height % config.size !== 0) {
    warn(
      `Spritesheet ${config.id} with size ${config.size} has non-multiple height of ${image.height}`
    );
  }

  const cellWidth = Math.floor(image.width / config.size);
  const cellHeight = Math.floor(image.height / config.size);

  const promises: Promise<void>[] = [];
  for (let y = 0; y < cellHeight; y++) {
    for (let x = 0; x < cellWidth; x++) {
      promises.push(splitSpritesheetPart(config, image, x, y));
    }
  }
  await Promise.all(promises);
};

const copySprites = async (config: SpritesheetConfig) => {
  info(`Copying sprites for "${config.id}"`);

  await Promise.all(
    config.sprites.map(async (sprite) => {
      await fs.copyFile(
        getSpritesheetPartPath(config, sprite.x, sprite.y),
        getSpritePath(sprite.name)
      );
    })
  );
};

const makeManifest = async (configs: SpritesheetConfig[]) => {
  info("Generating manifest...");

  const spritesheets: SpritesheetManifest[] = [];

  for (const config of configs) {
    const assetPath = getSpritesheetPath(config).replace("./public", "");

    // TODO: could be more efficient since we already do this,
    // but it was a pain to organize well
    const image = await Jimp.read(getSpritesheetPath(config));

    spritesheets.push({
      ...config,
      width: image.width,
      height: image.height,
      assetPath,
    });
  }

  const manifest: Manifest = {
    generatedAt: new Date().getTime(),
    spritesheets,
  };

  await fs.writeFile(
    "./public/manifest.json",
    JSON.stringify(manifest, null, 4),
    { encoding: "utf-8" }
  );
};

const run = async (args: string[]): Promise<boolean> => {
  // parse options
  const options = parseArgs({
    args,
    options: {
      changed: {
        type: "boolean",
        default: false,
      },
    },
  });

  // check if lockfile exists
  info("Reading lockfile...");
  let lockfileExists = false;
  try {
    await fs.access("./state/lockfile.json");
    lockfileExists = true;
  } catch (e) {
    warn("Failed to access lockfile, creating it.");
  }

  // read lockfile
  let lockfile;
  if (lockfileExists) {
    // try to read contents
    let lockfileContents;
    try {
      lockfileContents = await fs.readFile("./state/lockfile.json", {
        encoding: "utf-8",
      });
    } catch (e) {
      error("Failed to read existing lockfile.");
      return false;
    }

    // try to parse contents
    try {
      lockfile = lockfileSchema.parse(JSON.parse(lockfileContents));
    } catch (e) {
      error("Failed to parse lockfile: ", e);
      return false;
    }
  } else {
    lockfile = DEFAULT_LOCKFILE;
  }

  // hash configs
  const configHashes = new Map<string, string>();
  for (const config of SPRITESHEET_CONFIGS) {
    // canonicalize according to RFC 8785 for stable hashing
    const configString = canonicalize(config);
    if (configString === undefined) {
      throw new Error("unexpected");
    }
    // hash with xxhash 64, then convert to hex string
    const configHash = xxh64(configString).toString(16);
    configHashes.set(config.id, configHash);
  }

  // info
  if (options.values.changed) {
    info("Skipping unchanged configs due to --changed.");
  }

  // determine configs to process
  const configsToProcess = SPRITESHEET_CONFIGS.filter((config) => {
    // if --changed was passed
    if (options.values.changed) {
      // read the existing hash from the lockfile
      const existingHash = lockfile.spritesheets.find(
        (s) => s.id === config.id
      )?.configHash;
      if (typeof existingHash === "undefined") {
        // spritesheet isn't in the lockfile, process it
        return true;
      }

      // get the current config hash
      const currentHash = configHashes.get(config.id);
      if (typeof existingHash === "undefined") {
        throw new Error("unexpected");
      }

      // check if hash is unchanged
      if (existingHash === currentHash) {
        return false;
      }
    }

    return true;
  });

  const spritesheetHashes = new Map<string, string>();

  if (configsToProcess.length > 0) {
    info(`Updating ${configsToProcess.length} spritesheets...`);

    await fs.mkdir("./public/assets", { recursive: true });
    await fs.mkdir("./public/sprites", { recursive: true });

    for (const config of configsToProcess) {
      const res = await downloadSpritesheet(config);

      // store hash of downloaded file
      spritesheetHashes.set(config.id, res.hash);
    }
    for (const config of configsToProcess) {
      await splitSpritesheet(config);
    }
    for (const config of configsToProcess) {
      await copySprites(config);
    }
  } else {
    info("All spritesheets were skipped.");
  }

  await makeManifest(SPRITESHEET_CONFIGS);

  // write lockfile
  info("Writing lockfile...");
  const updatedLockfile: Lockfile = {
    spritesheets: SPRITESHEET_CONFIGS.map((spritesheet) => {
      const configHash = configHashes.get(spritesheet.id);
      if (typeof configHash === "undefined") {
        throw new Error("unexpected");
      }

      // get previous values from lockfile
      const prevLock = lockfile.spritesheets.find(
        (s) => s.id === spritesheet.id
      );

      // get hash if it was processed
      let fileHash = spritesheetHashes.get(spritesheet.id);
      if (typeof fileHash === "undefined") {
        // spritesheet should always be in lockfile or changed
        if (typeof prevLock === "undefined") {
          throw new Error("unexpected");
        }

        fileHash = prevLock.fileHash;
      }

      // check if file hash changed and update time
      let fileHashSince = new Date().getTime();
      if (prevLock && fileHash === prevLock.fileHash) {
        fileHashSince = prevLock.fileHashSince;
      }

      return {
        id: spritesheet.id,
        configHash,
        fileHash,
        fileHashSince,
      };
    }),
  };
  // hack to canonicalize fields then pretty-print
  const canonicalUpdatedLockfile = canonicalize(updatedLockfile) ?? "{}";
  const prettyCanonicalUpdatedLockfile = JSON.stringify(
    JSON.parse(canonicalUpdatedLockfile),
    null,
    4
  );
  await fs.writeFile("./state/lockfile.json", prettyCanonicalUpdatedLockfile, {
    encoding: "utf-8",
  });

  info("Finished!");

  return true;
};

run(process.argv.slice(2)).then((success) => {
  if (success) {
    exit(0);
  } else {
    exit(1);
  }
});
