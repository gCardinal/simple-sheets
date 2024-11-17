/**
 * A system is the object used to define a system for character sheets. This
 * system contains static information about the system as well as "global"
 * utilities such as migrations to run on characters when loaded.
 */
export interface System {
  // Slug name of the system; used to fetch the system.
  slug: string;
  // Version of the system. Note that this isn't the version
  // like "5e" or "3.5e", but the code version of the system.
  version: number;
  // Pretty name of the system. Used for display purposes, without
  // having to load the system's code.
  name: string;
  // @enable once used
  // runMigrations: (character: CharacterSheet, storage: Storage) => Promise<void>;
}
