import { type CharacterSheet, type DataBridge } from "@libs/character-sheet";
import { type Repository } from "../sheets";

export const createDataBridge = (
  repository: Repository<CharacterSheet>,
): DataBridge => ({
  saveSheet: async (sheet) => {
    await repository.update(sheet);
  },
});
