export class CharacterSheetException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  public static requestedSystemNotFound(
    slug: string,
    operation: "load-system" | "load-renderer",
  ): CharacterSheetException {
    return new CharacterSheetException(
      `No system found for slug "${slug}" when trying to ${operation}.`,
    );
  }
}
