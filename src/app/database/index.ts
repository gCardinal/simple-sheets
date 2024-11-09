import { Dexie, EntityTable } from "dexie";

interface Character {
  id: number;
  name: string;
  pictureId: string;
  characterSheetId: string;
}

interface Picture {
  id: number;
  base64Data: string;
}

interface CharacterSheet {
  id: number;
  system: string;
  data: string;
}

export const db = new Dexie("simple-sheets") as Dexie & {
  characters: EntityTable<Character, "id">;
  pictures: EntityTable<Picture, "id">;
  characterSheets: EntityTable<CharacterSheet, "id">;
};

db.version(1).stores({
  friends: "++id",
  pictures: "++id",
  characterSheets: "++id",
});
