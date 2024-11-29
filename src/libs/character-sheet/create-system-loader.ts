import { type System } from "./models";
import { type Registrar } from "./create-registrar";

/**
 * Lazy loads systems and caches them in memory.
 */
export const createSystemLoader = (registrar: Registrar) => {
  const loadedSystems = new Map<string, System>();

  return {
    load: async (slug: string): Promise<System> => {
      const loadedSystem = loadedSystems.get(slug);

      if (loadedSystem) {
        return loadedSystem;
      }

      const systemRegister = registrar.getSystemRegister(slug);
      const system = await systemRegister.loadSystem();

      loadedSystems.set(system.slug, system);

      return system;
    },
    // getRegisteredSystems: (): SystemRegister[] =>
    //   registrations.map(([system]) => system),
    // getRegisteredSystem: (slug: string): SystemRegister => {
    //   const registration = registrations.find(
    //     ([system]) => system.slug === slug,
    //   );
    //
    //   if (!registration) {
    //     throw new Error("System not found");
    //   }
    //
    //   return registration[0];
    // },
  };
};

export type SystemLoader = ReturnType<typeof createSystemLoader>;
