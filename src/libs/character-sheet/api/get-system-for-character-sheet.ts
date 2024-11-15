import {
  type CharacterSheet,
  type System,
  type SystemRegistration,
} from "../models";

export const getSystemForCharacterSheet = async (
  characterSheet: CharacterSheet,
  registeredSystems: SystemRegistration[],
): Promise<System> => {
  const registeredSystem = registeredSystems.find(
    (system) => system.slug === characterSheet.system.slug,
  );

  if (!registeredSystem) {
    throw new Error(
      `System for character sheet "${JSON.stringify(characterSheet)}" not found.`,
    );
  }

  return registeredSystem.loadSystem();
};
