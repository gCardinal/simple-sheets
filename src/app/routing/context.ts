import type { Storage } from "@libs/storage";
import { type CharacterSheetClient } from "@libs/character-sheet/create-character-sheet-client.ts";

export interface RouterContext {
  storage: Storage;
  characterSheetClient: CharacterSheetClient;
}
