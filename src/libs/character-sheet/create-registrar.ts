import type { RendererRegister, SystemRegister } from "./types";
import { CharacterSheetException } from "@libs/character-sheet/exceptions.ts";

export const createRegistrar = (
  registries: [SystemRegister, RendererRegister][],
) => {
  // run validations

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
