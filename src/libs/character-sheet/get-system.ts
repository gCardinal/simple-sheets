import { type RpgSystem } from "./rpg-system";

const loadedSystems = new Map<string, RpgSystem>();

export const getSystem = async (slug: string): Promise<RpgSystem> => {
  const loadedSystem = loadedSystems.get(slug);

  if (loadedSystem) {
    return loadedSystem;
  }

  const system = await import(`@libs/system-${slug}`);
  loadedSystems.set(slug, system.system);

  return system.system;
};
