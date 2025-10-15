# isleward-assets
Automated extraction of sprites from [Isleward](https://gitlab.com/isleward/isleward).
Available online at [assets.islebuilds.com](https://assets.islebuilds.com).
Hosts both full spritesheets and individually sliced sprites with a pretty index.

Programmatic use is possible using `/manifest.json`.
Spritesheets are available at `/assets/<id>/<id>.png`.
Sliced sprites are available at `/assets/<id>/<id>_<x>_<y>.png`.
Named sprites are also available at `/sprites/<name>.png`.

Spritesheets from `src/client/images` in the main Isleward repository are not prefixed.
Spritesheets from mods are prefixed as `<mod name>/<sheet name>`.

## Contributing
Contributions are welcome.
In particular, the spritesheet list in `assets/config.ts` needs to be
kept up to date as new spritesheets are added or existing sheets are updated.
When contributing changes to the config, the updated lockfile should not be
comitted. It will be handled by CI.

To run locally: Install nodejs, pnpm, and git; clone, `pnpm i`, `pnpm dev`.

`build.ts` optionally accepts the flag `--changed` which will check each
spritesheet's config and only download it if the config has changed since the
previous run. The provided `dev:assets` script runs the script once without the
flag to ensure all spritesheets are up to date, then watches for file changes
and reruns the script with `--changed`. This is useful for editing the config,
as each run after the initial run is much faster, but might be unhelpful when
making general code changes.

As of April 2025, mod images are bundled into the JS by Vite using [this plugin](https://gitlab.com/Isleward/isleward/-/blob/master/src/client/vitePlugins/buildModImages.js). `build.ts` accepts the flag `--print-mod-images` to print the list of mod image paths.

## License
Assets are from [Isleward](https://gitlab.com/isleward/isleward).
Hosted assets might not be permissibly licensed.

This project's code is licensed under MIT.
