import { type CharacterSheet } from "./character-sheet";

export interface Renderer {
  slug: string;
  render: (character: CharacterSheet) => unknown;
}
