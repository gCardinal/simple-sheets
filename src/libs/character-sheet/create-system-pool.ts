import { type System } from "./models";
import type { CharacterSheetClientOptions } from "./create-character-sheet-client";

/**
 * Lazy loads systems and caches them in memory.
 */
export const createSystemPool = (
  registrations: CharacterSheetClientOptions["registrations"],
) => {
  const loadedSystems = new Map<string, System>();

  return {
    get: async (slug: string): Promise<System> => {
      const loadedSystem = loadedSystems.get(slug);

      if (loadedSystem) {
        return loadedSystem;
      }

      let system: System | undefined;

      for (const [systemRegistration] of registrations) {
        if (slug === systemRegistration.slug) {
          system = await systemRegistration.loadSystem();
          loadedSystems.set(system.slug, system);
        }
      }

      if (!system) {
        throw new Error("nope");
      }

      return system;
    },
  };
};

export type SystemPool = ReturnType<typeof createSystemPool>;
