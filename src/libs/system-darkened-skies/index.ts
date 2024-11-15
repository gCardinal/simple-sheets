import { type System } from "@libs/character-sheet";
import { renderCharacterSheet } from "./render-character-sheet";

export const system: System = {
  name: "Darkened Skies",
  slug: "darkened-skies",
  version: 1,
  runMigrations: async () => Promise.resolve(),
  renderCharacterSheet,
};
