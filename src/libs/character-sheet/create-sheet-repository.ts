import { type SystemAndRendererRegistrationMap } from "./models";
import { type Storage } from "@libs/storage";
import {
  createNewCharacterSheet,
  getAllCharacterSheets,
  getCharacterSheetById,
} from "./api";

export interface SheetRepositoryOptions {
  registrations: SystemAndRendererRegistrationMap;
  storage: Storage;
}

export const createSheetRepository = ({
  registrations,
  storage,
}: SheetRepositoryOptions) => {
  return {
    getAll: () => getAllCharacterSheets(storage),
    getById: async (id: string) => getCharacterSheetById(id, storage),
    create: async (characterName: string, systemSlug: string) =>
      createNewCharacterSheet(
        characterName,
        systemSlug,
        storage,
        registrations.map(([system]) => system),
      ),
    delete: async (id: string) => {
      await storage.removeItem(id);
    },
  };
};

export type SheetRepository = ReturnType<typeof createSheetRepository>;
