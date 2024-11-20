import {
  createSheetRepository,
  type SheetRepository,
} from "@libs/character-sheet";
import { storage } from "../storage.ts";
import { registrations } from "./registration-map.ts";

export const sheetRepository: SheetRepository = createSheetRepository({
  storage,
  registrations,
});
