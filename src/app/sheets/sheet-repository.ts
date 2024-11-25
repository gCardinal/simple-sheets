import { db } from "../db";
import { CharacterSheet } from "@libs/character-sheet";
import { assert } from "@libs/validation";

export type Repository<O = unknown> = {
  create: (o: unknown) => Promise<string>;
  getById: (id: string) => Promise<O | undefined>;
  update: (o: O) => Promise<void>;
  delete: (id: string) => Promise<void>;
  list: () => Promise<O[]>;
};

export const sheetRepository: Repository<CharacterSheet> = {
  async create(character: unknown): Promise<string> {
    // const character: Partial<CharacterSheet> = {
    //   id: nanoid(),
    //   name,
    //   systemSlug,
    // };

    assert(character, CharacterSheet);

    return db.sheets.add(character);
  },
  async getById(id: string): Promise<CharacterSheet | undefined> {
    return db.sheets.where("id").equals(id).first();
  },
  async update(sheet: CharacterSheet) {
    await db.sheets.update(sheet.id, sheet);

    return;
  },
  async delete(id: string) {
    return db.sheets.delete(id);
  },
  async list(): Promise<CharacterSheet[]> {
    return db.sheets.toArray() ?? [];
  },
};
