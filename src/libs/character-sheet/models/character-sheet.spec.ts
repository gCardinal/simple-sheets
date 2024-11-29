import { describe, expect, it } from "vitest";
import { CharacterSheet } from "./character-sheet";
import { validate } from "@libs/validation";

describe("CharacterSheet", () => {
  it("should validate", () => {
    const characterSheet: CharacterSheet = {
      id: "1",
      name: "Test Character",
      systemSlug: "test",
    };

    const [error, validatedCharacterSheet] = validate(
      characterSheet,
      CharacterSheet,
    );

    expect(error).toBeUndefined();
    expect(validatedCharacterSheet).toMatchObject(characterSheet);
  });

  it("should allows extra properties", () => {
    const characterSheet: CharacterSheet = {
      id: "1",
      name: "Test Character",
      systemSlug: "test",
      extra: "property",
    };

    const [error, validatedCharacterSheet] = validate(
      characterSheet,
      CharacterSheet,
    );

    expect(error).toBeUndefined();
    expect(validatedCharacterSheet).toMatchObject(characterSheet);
  });
});
