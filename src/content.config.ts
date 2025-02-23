import { defineCollection } from "astro:content";
import { spritesheetManifestSchema } from "../assets/schema";
import { manifest } from "./manifest";

const spritesheets = defineCollection({
  loader: async () => {
    return manifest.spritesheets;
  },
  schema: spritesheetManifestSchema,
});

export const collections = { spritesheets };
