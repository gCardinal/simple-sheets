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

  public static mismatchedSystemAndRenderer(
    systemSlug: string,
    rendererSlug: string,
  ): CharacterSheetException {
    return new CharacterSheetException(
      `System slug ${systemSlug} does not match renderer slug ${rendererSlug}.`,
    );
  }

  public static rendererVersionMismatch(
    slug: string,
    systemVersion: number,
    rendererSupportedVersions: number[],
  ): CharacterSheetException {
    return new CharacterSheetException(
      `System version ${systemVersion} is not supported by renderer ${slug}. Supported versions: ${rendererSupportedVersions.join(", ")}.`,
    );
  }

  public static registrationFailed(
    errors: CharacterSheetException[],
  ): CharacterSheetException {
    return new CharacterSheetException(
      `One or more errors occurred during registration: ${errors.map((error, i) => `\n  ${i}: ${error.message}`).join("")}`,
    );
  }
}
