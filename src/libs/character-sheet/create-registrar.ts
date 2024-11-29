import type { RendererRegister, SystemRegister } from "./types";
import { CharacterSheetException } from "./exceptions";

const validateRegistries = (
  registries: [SystemRegister, RendererRegister][],
) => {
  const validationErrors: CharacterSheetException[] = [];

  for (const registry of registries) {
    const [system, renderer] = registry;

    if (system.slug !== renderer.system) {
      validationErrors.push(
        CharacterSheetException.mismatchedSystemAndRenderer(
          system.slug,
          renderer.system,
        ),
      );
    }

    if (!renderer.versions.includes(system.version)) {
      validationErrors.push(
        CharacterSheetException.rendererVersionMismatch(
          system.slug,
          system.version,
          renderer.versions,
        ),
      );
    }
  }

  if (validationErrors.length) {
    throw CharacterSheetException.registrationFailed(validationErrors);
  }
};

export const createRegistrar = (
  registries: [SystemRegister, RendererRegister][],
) => {
  validateRegistries(registries);

  return {
    getAllSystemRegisters: (): SystemRegister[] =>
      registries.map(([system]) => system),
    getSystemRegister: (slug: string): SystemRegister => {
      const register = registries.find(([system]) => system.slug === slug);

      if (!register) {
        throw CharacterSheetException.requestedResourceNotFound(slug, "system");
      }

      return register[0];
    },
    getRendererRegister: (slug: string): RendererRegister => {
      const register = registries.find(([system]) => system.slug === slug);

      if (!register) {
        throw CharacterSheetException.requestedResourceNotFound(
          slug,
          "renderer",
        );
      }

      return register[1];
    },
  };
};

export type Registrar = ReturnType<typeof createRegistrar>;
