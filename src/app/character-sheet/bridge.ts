import type { CharacterSheet, DataBridge } from "@libs/character-sheet";
import type { Repository } from "@libs/database";

export const createDataBridge = (
  repository: Repository<CharacterSheet>,
): DataBridge => ({
  saveSheet: async (sheet) => {
    await repository.update(sheet);
  },
});
