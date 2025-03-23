import { z } from "astro/zod";

// config

export const spriteConfigSchema = z.object({
  name: z.string(),
  x: z.number(),
  y: z.number(),
});
export type SpriteConfig = z.infer<typeof spriteConfigSchema>;
export const spritesheetConfigSchema = z.object({
  id: z.string(),
  url: z.string(),
  size: z.number(),
  sprites: z.array(spriteConfigSchema),
});
export type SpritesheetConfig = z.infer<typeof spritesheetConfigSchema>;

// manifest

export const spritesheetManifestSchema = spritesheetConfigSchema.extend({
  width: z.number(),
  height: z.number(),
  assetPath: z.string(),
});
export type SpritesheetManifest = z.infer<typeof spritesheetManifestSchema>;

export const manifestSchema = z.object({
  generatedAt: z.number(),
  spritesheets: z.array(spritesheetManifestSchema),
});
export type Manifest = z.infer<typeof manifestSchema>;

// lockfile

export const spritesheetLockSchema = z.object({
  id: z.string(),
  configHash: z.string(),
  fileHash: z.string(),
  fileHashSince: z.number(),
});
export type SpritesheetLock = z.infer<typeof spritesheetLockSchema>;

export const lockfileSchema = z.object({
  spritesheets: z.array(spritesheetLockSchema),
});
export type Lockfile = z.infer<typeof lockfileSchema>;

export const DEFAULT_LOCKFILE: Lockfile = {
  spritesheets: [],
};
