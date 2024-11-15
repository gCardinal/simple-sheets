import { type CharacterSheet } from "@libs/character-sheet";

export const renderCharacterSheet = (character: CharacterSheet) => {
  return <p>{character.name} (Legacy)</p>;
};
