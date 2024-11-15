import { type Storage } from "@libs/storage";
import { assert } from "@libs/validation";
import { characterSheetSchema } from "../validation";
import { type CharacterSheet } from "../models";

export const getCharacterSheetById = async (
  id: string,
  storage: Storage,
): Promise<CharacterSheet> => {
  const character = await storage.getItem(id);

  assert(character, characterSheetSchema);

  return character;
};
