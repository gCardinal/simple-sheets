import { type CharacterSheet } from "./models";

export class CharacterSheetException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  public static characterSheetNotFound(id: string): CharacterSheetException {
    return new CharacterSheetException(
      `Character sheet with id "${id}" not found`,
    );
  }

  public static systemDoesNotExistForSheet(
    characterSheet: CharacterSheet,
  ): CharacterSheetException {
    return new CharacterSheetException(
      `System for character sheet "${JSON.stringify(characterSheet)}" not found.`,
    );
  }

  public static systemNotFound(slug: string): CharacterSheetException {
    return new CharacterSheetException(
      `System "${slug}" not found. Was it properly registered?`,
    );
  }
}
