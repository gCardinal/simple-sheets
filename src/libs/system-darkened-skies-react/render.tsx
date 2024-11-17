import { type CharacterSheet } from "@libs/character-sheet";

export const render = (character: CharacterSheet) => {
  return <h1>{character.name}</h1>;
};
