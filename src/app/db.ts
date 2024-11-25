import { type CharacterSheet } from "@libs/character-sheet";
import { createConnection, type EntityTable } from "@libs/database";

export const db = createConnection<{
  sheets: EntityTable<CharacterSheet, "id">;
}>({
  version: 1,
  databaseName: "simple-sheets",
  tables: [
    { name: "sheets", primaryKey: "id", autoIncrementPrimaryKey: false },
  ],
});
