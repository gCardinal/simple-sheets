import { type CharacterSheet } from "@libs/character-sheet";

export const render = (character: CharacterSheet) => {
  return <p>{character.name} (Legacy)</p>;
};
