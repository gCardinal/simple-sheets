import { type System, type SystemAndRendererRegistrationMap } from "./models";

/**
 * Lazy loads systems and caches them in memory.
 */
export const createSystemLoader = (
  registrations: SystemAndRendererRegistrationMap,
) => {
  const loadedSystems = new Map<string, System>();

  return {
    get: async (slug: string): Promise<System> => {
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
    getRegisteredSystems: (): Pick<System, "slug" | "name">[] =>
      registrations.map(([system]) => ({
        name: system.name,
        slug: system.slug,
      })),
  };
};

export type SystemLoader = ReturnType<typeof createSystemLoader>;
