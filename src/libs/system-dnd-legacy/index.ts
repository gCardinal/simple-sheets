import { type System } from "@libs/character-sheet";

export const system: System = {
  name: "D&D 5e (Legacy)",
  slug: "dnd-legacy",
  version: 1,
  runMigrations: async () => Promise.resolve(),
};
