import {
  type CharacterSheet,
  type Renderer,
  type RendererRegistration,
  type SystemRegistration,
} from "./models";
import { type Storage } from "@libs/storage";
import {
  createNewCharacterSheet,
  getAllCharacterSheets,
  getCharacterSheetById,
} from "@libs/character-sheet/api";

export const createCharacterSheetClient = ({
  registrations,
  storage,
}: {
  registrations: [SystemRegistration, RendererRegistration][];
  storage: Storage;
}) => {
  // Will only be required when migrations happen?
  // const loadedSystems = new Map<string, System>();
  const loadedRenderers = new Map<string, Renderer>();

  // Validate renderers match with their systems
  const matchErrors = [];
  for (const [systemRegistration, rendererRegistration] of registrations) {
    if (systemRegistration.slug !== rendererRegistration.system) {
      matchErrors.push([rendererRegistration.system, systemRegistration.slug]);
    }
  }

  if (matchErrors.length > 0) {
    throw new Error(
      `Renderer system mismatch: ${matchErrors.map(([renderer, system]) => `${renderer} -> ${system}`).join(", ")}`,
    );
  }

  return {
    getAllCharacterSheets: () => getAllCharacterSheets(storage),
    getRendererForSheet: async (sheet: CharacterSheet): Promise<Renderer> => {
      const loadedRenderer = loadedRenderers.get(sheet.system.slug);
      if (loadedRenderer) {
        return loadedRenderer;
      }

      let renderer: Renderer | undefined;

      for (const [, rendererRegistration] of registrations) {
        if (sheet.system.slug === rendererRegistration.system) {
          renderer = await rendererRegistration.loadRenderer();
          loadedRenderers.set(sheet.system.slug, renderer);
        }
      }

      if (!renderer) {
        throw new Error("nope");
      }

      return renderer;
    },
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
