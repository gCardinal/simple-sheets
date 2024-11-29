import { type System } from "./models";
import {
  type SystemAndRendererRegistrationMap,
  type SystemRegistration,
} from "./types";
import { CharacterSheetException } from "@libs/character-sheet/exceptions.ts";

/**
 * Lazy loads systems and caches them in memory.
 */
export const createSystemLoader = (
  registrations: SystemAndRendererRegistrationMap,
) => {
  const loadedSystems = new Map<string, System>();

  return {
    load: async (slug: string): Promise<System> => {
      const loadedSystem = loadedSystems.get(slug);

      if (loadedSystem) {
        return loadedSystem;
      }

      for (const [systemRegistration] of registrations) {
        if (slug === systemRegistration.slug) {
          const system = await systemRegistration.loadSystem();
          loadedSystems.set(system.slug, system);
          return system;
        }
      }

      throw CharacterSheetException.requestedSystemNotFound(
        slug,
        "load-system",
      );
    },
    getRegisteredSystems: (): SystemRegistration[] =>
      registrations.map(([system]) => system),
    getRegisteredSystem: (slug: string): SystemRegistration => {
      const registration = registrations.find(
        ([system]) => system.slug === slug,
      );

      if (!registration) {
        throw new Error("System not found");
      }

      return registration[0];
    },
  };
};

export type SystemLoader = ReturnType<typeof createSystemLoader>;
