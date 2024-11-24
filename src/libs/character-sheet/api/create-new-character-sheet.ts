import { type Storage } from "@libs/storage";
import { assert } from "@libs/validation";
import { CharacterSheet } from "../models";
import { nanoid } from "nanoid";
import { CharacterSheetException } from "../character-sheet.exception";
import { type SystemRegistration } from "../types";

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
      shortName: system.shortName,
      slug: system.slug,
      version: system.version,
    },
  };

  assert(character, CharacterSheet);

  await storage.setItem(character.id, character);

  return character;
};
