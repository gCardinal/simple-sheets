import { type CharacterSheet } from "@libs/character-sheet";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";

export const useGetSheet = (id: string): CharacterSheet | undefined => {
  return useLiveQuery(() => db.sheets.where("id").equals(id).first(), [id]);
};
