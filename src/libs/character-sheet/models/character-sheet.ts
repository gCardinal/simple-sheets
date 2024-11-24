import { number, object, string } from "@libs/validation";
import { type Infer } from "superstruct";

/**
 * Base interface for a character. Systems should extend this interface
 * to add properties specific to their system.
 */
export const CharacterSheet = object({
  id: string(),
  name: string(),
  system: object({
    slug: string(),
    version: number(),
    name: string(),
    shortName: string(),
  }),
});

export type CharacterSheet = Infer<typeof CharacterSheet>;
