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

To run locally: Install nodejs, pnpm, and git; clone, `pnpm i`, `pnpm dev`.

## License
Assets are from [Isleward](https://gitlab.com/isleward/isleward).
Hosted assets might not be permissibly licensed.

This project's code is licensed under MIT.
