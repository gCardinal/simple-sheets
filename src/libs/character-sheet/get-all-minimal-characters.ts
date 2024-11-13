import { type Storage } from "@libs/storage";
import { type MinimalCharacter } from "./minimal-character";
import { assert } from "@libs/validation";
import { minimalCharacterSchema } from "./validation";

export const getAllMinimalCharacters = async (
  storage: Storage,
): Promise<MinimalCharacter[]> => {
  const keys = await storage.keys();
  const characters: Array<MinimalCharacter> = [];

  for (const key of keys) {
    const character = await storage.getItem(key);
    assert(character, minimalCharacterSchema);
    characters.push(character);
  }

  return characters;
};
