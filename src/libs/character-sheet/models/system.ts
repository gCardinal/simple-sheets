import { type Infer, number, string, type } from "@libs/validation";

/**
 * A system is the object used to define a system for character sheets. This
 * system contains static information about the system as well as "global"
 * utilities such as migrations to run on characters when loaded.
 *
 * This interface should be extended by systems to add properties they
 * will require to be functional.
 */
export const System = type({
  /**
   * Slug name of the system; used to fetch the system.
   */
  slug: string(),
  /**
   * Version of the system. Note that this isn't the version
   * like "5e" or "3.5e", but the code version of the system.
   */
  version: number(),
  /**
   * Pretty name of the system. Used for display purposes, without
   * having to load the system's code.
   */
  name: string(),
  /**
   * Short name for the system. Pathfinder -> PF, Dungeons & Dragons 5e -> D&D 5e, etc.
   */
  shortName: string(),
});

export type System = Infer<typeof System> & Record<string, unknown>;
