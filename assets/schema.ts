import { z } from "astro/zod";

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
