import { type Storage } from "@libs/storage";
import { assert } from "@libs/validation";
import { characterSheetSchema } from "../validation";
import { type CharacterSheet, type SystemRegistration } from "../models";
import { nanoid } from "nanoid";
import { CharacterSheetException } from "../character-sheet.exception";

export const createNewCharacterSheet = async (
  characterName: string,
  systemSlug: string,
  storage: Storage,
  registeredSystems: SystemRegistration[],
): Promise<CharacterSheet> => {
  const system = registeredSystems.find((system) => system.slug === systemSlug);

  if (!system) {
    throw CharacterSheetException.systemNotFound(systemSlug);
  }

  const character: Partial<CharacterSheet> = {
    id: nanoid(),
    name: characterName,
    system: {
      name: system.name,
      slug: system.slug,
      version: system.version,
    },
  };

  assert(character, characterSheetSchema);

  await storage.setItem(character.id, character);

  return character;
};
