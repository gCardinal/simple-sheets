import { type System } from "./models";
import { type SystemAndRendererRegistrationMap } from "./types";

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

      throw new Error("nope");
    },
    getRegisteredSystems: (): System[] =>
      registrations.map(([system]) => system),
    getRegisteredSystem: (slug: string): System => {
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
