export class CharacterSheetException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  public static requestedResourceNotFound(
    slug: string,
    resourceType: "system" | "renderer",
  ): CharacterSheetException {
    return new CharacterSheetException(
      `Unable to locate requested ${resourceType} with slug ${slug} within the registry.`,
    );
  }
}
