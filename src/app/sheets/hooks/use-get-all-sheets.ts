import { type CharacterSheet } from "@libs/character-sheet";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";

export const useGetAllSheets = (): CharacterSheet[] => {
  return useLiveQuery(() => db.sheets.toArray()) ?? [];
};
