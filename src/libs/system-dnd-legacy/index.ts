import { type RpgSystem } from "@libs/character-sheet";

export const system: RpgSystem = {
  name: "D&D 5e (Legacy)",
  slug: "dnd-legacy",
  version: 1,
  // debug: "Oh oh, this should not be here",
  runMigrations: async () => Promise.resolve(),
};
