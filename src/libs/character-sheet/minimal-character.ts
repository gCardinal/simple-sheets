/**
 * Base interface for a character. Systems should extend this interface
 * to add properties specific to their system.
 */
export interface MinimalCharacter {
  id: string;
  name: string;
  system: {
    // Slug name of the system; used to fetch the system.
    slug: string;
    // Version of the system. Note that this isn't the version
    // like "5e" or "3.5e", but the code version of the system.
    version: string;
    // Pretty name of the system. Used for display purposes, without
    // having to load the system's code.
    name: string;
  };
}
