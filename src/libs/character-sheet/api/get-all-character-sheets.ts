import { type Storage } from "@libs/storage";
import { assert } from "@libs/validation";
import { CharacterSheet } from "../models";

export const getAllCharacterSheets = async (
  storage: Storage,
): Promise<CharacterSheet[]> => {
  const keys = await storage.keys();
  const characters: Array<CharacterSheet> = [];

  for (const key of keys) {
    const character = await storage.getItem(key);
    assert(character, CharacterSheet);
    characters.push(character);
  }

  return characters;
};
