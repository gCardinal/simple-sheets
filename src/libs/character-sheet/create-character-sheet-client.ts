import {
  type CharacterSheet,
  type Renderer,
  type RendererRegistration,
  type System,
  type SystemRegistration,
} from "./models";
import { type Storage } from "@libs/storage";
import {
  createNewCharacterSheet,
  getAllCharacterSheets,
  getCharacterSheetById,
} from "./api";
import { validateClientRegistrations } from "./validation";
import { createRendererPool, type RendererPool } from "./create-renderer-pool";
import { createSystemPool, type SystemPool } from "./create-system-pool";

export interface CharacterSheetClientOptions {
  registrations: [SystemRegistration, RendererRegistration][];
  storage: Storage;
}

export const createCharacterSheetClient = ({
  registrations,
  storage,
}: CharacterSheetClientOptions) => {
  const systemPool: SystemPool = createSystemPool(registrations);
  const rendererPool: RendererPool = createRendererPool(registrations);

  validateClientRegistrations(registrations);

  return {
    getAllCharacterSheets: () => getAllCharacterSheets(storage),
    getRendererForSheet: async (sheet: CharacterSheet): Promise<Renderer> =>
      rendererPool.get(sheet.system.slug),
    getSystemForSheet: async (sheet: CharacterSheet): Promise<System> =>
      systemPool.get(sheet.system.slug),
    getCharacterSheetById: async (id: string) =>
      getCharacterSheetById(id, storage),
    getRegisteredSystems: (): Array<{ name: string; slug: string }> =>
      registrations.map(([system]) => ({
        name: system.name,
        slug: system.slug,
      })),
    createNewCharacterSheet: async (
      characterName: string,
      systemSlug: string,
    ) =>
      createNewCharacterSheet(
        characterName,
        systemSlug,
        storage,
        registrations.map(([system]) => system),
      ),
  };
};

export type CharacterSheetClient = ReturnType<
  typeof createCharacterSheetClient
>;
