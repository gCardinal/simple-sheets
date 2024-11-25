import Dexie, { type EntityTable } from "dexie";
import { type CharacterSheet } from "@libs/character-sheet";

export const db = new Dexie("simple-sheets") as Dexie & {
  sheets: EntityTable<CharacterSheet, "id">;
};

db.version(1).stores({
  sheets: "++id",
});
