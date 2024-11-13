import { type System } from "./system";

/**
 * Base interface for a character. Systems should extend this interface
 * to add properties specific to their system.
 */
export interface CharacterSheet {
  id: string;
  name: string;
  system: Pick<System, "slug" | "name" | "version">;
}
