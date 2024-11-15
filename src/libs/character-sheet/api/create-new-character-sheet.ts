import { type Storage } from "@libs/storage";
import { assert } from "@libs/validation";
import { characterSheetSchema } from "../validation";
import { type CharacterSheet } from "../models";
import { type SystemRegistration } from "@libs/character-sheet";
import { nanoid } from "nanoid";

export const createNewCharacterSheet = async (
  characterName: string,
  systemSlug: string,
  storage: Storage,
  registeredSystems: SystemRegistration[],
): Promise<CharacterSheet> => {
  const system = registeredSystems.find((system) => system.slug === systemSlug);

  if (!system) {
    throw new Error(`System with slug "${systemSlug}" not found`);
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
