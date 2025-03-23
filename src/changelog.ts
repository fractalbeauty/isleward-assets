import { changelogSchema } from "../assets/schema";
import changelogJson from "../public/changelog.json";

let rawChangelog = changelogSchema.parse(changelogJson);

rawChangelog.reverse();

export const changelog = rawChangelog;
