import { type Infer, string, type } from "@libs/validation";

/**
 * Base interface for a character. Systems should extend this interface
 * to add properties specific to their system.
 */
export const CharacterSheet = type({
  id: string(),
  name: string(),
  systemSlug: string(),
});

// Allow arbitrary properties to be added to the character sheet since
// each system will need more information than just the base sheet.
export type CharacterSheet = Infer<typeof CharacterSheet> &
  Record<string, unknown>;
