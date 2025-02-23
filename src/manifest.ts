import { manifestSchema } from "../assets/schema";
import manifestJson from "../public/manifest.json";

export const manifest = manifestSchema.parse(manifestJson);
