import chalk from "chalk";
import fs from "fs/promises";
import { Jimp } from "jimp";
import { SPRITESHEET_CONFIGS } from "./config";
import type {
  Manifest,
  SpritesheetConfig,
  SpritesheetManifest,
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
  const bytes = await res.arrayBuffer();
  await fs.writeFile(getSpritesheetPath(config), new Uint8Array(bytes));
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

const run = async () => {
  info("Generating assets...");

  await fs.mkdir("./public/assets", { recursive: true });
  await fs.mkdir("./public/sprites", { recursive: true });

  for (const config of SPRITESHEET_CONFIGS) {
    await downloadSpritesheet(config);
  }
  for (const config of SPRITESHEET_CONFIGS) {
    await splitSpritesheet(config);
  }
  for (const config of SPRITESHEET_CONFIGS) {
    await copySprites(config);
  }
  await makeManifest(SPRITESHEET_CONFIGS);

  info("Finished generating assets!");
};

run();
