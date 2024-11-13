import { type RpgSystem } from "@libs/character-sheet";

export const system: RpgSystem = {
  name: "Darkened Skies",
  slug: "darkened-skies",
  version: 1,
  runMigrations: async () => Promise.resolve(),
};
