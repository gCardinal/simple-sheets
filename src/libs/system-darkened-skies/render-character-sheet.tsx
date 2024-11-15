import { type CharacterSheet } from "@libs/character-sheet";

export const renderCharacterSheet = (character: CharacterSheet) => {
  return <h1>{character.name}</h1>;
};
