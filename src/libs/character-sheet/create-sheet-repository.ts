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
    getAllCharacterSheets: () => getAllCharacterSheets(storage),
    getCharacterSheetById: async (id: string) =>
      getCharacterSheetById(id, storage),
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

export type SheetRepository = ReturnType<typeof createSheetRepository>;
