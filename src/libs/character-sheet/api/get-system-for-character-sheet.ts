import {
  type CharacterSheet,
  type System,
  type SystemRegistration,
} from "../models";
import { CharacterSheetException } from "../character-sheet.exception";

export const getSystemForCharacterSheet = async (
  characterSheet: CharacterSheet,
  registeredSystems: SystemRegistration[],
): Promise<System> => {
  const registeredSystem = registeredSystems.find(
    (system) => system.slug === characterSheet.system.slug,
  );

  if (!registeredSystem) {
    throw CharacterSheetException.systemDoesNotExistForSheet(characterSheet);
  }

  return registeredSystem.loadSystem();
};
