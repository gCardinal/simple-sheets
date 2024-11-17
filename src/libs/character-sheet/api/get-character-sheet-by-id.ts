import { type Storage } from "@libs/storage";
import { assert } from "@libs/validation";
import { characterSheetSchema } from "../validation";
import { type CharacterSheet } from "../models";
import { CharacterSheetException } from "../character-sheet.exception";

export const getCharacterSheetById = async (
  id: string,
  storage: Storage,
): Promise<CharacterSheet> => {
  const character = await storage.getItem(id);

  if (!character) {
    throw CharacterSheetException.characterSheetNotFound(id);
  }

  assert(character, characterSheetSchema);

  return character;
};
