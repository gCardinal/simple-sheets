import { db } from "../db";
import { CharacterSheet } from "@libs/character-sheet";
import { assert } from "@libs/validation";
import { type Repository } from "@libs/database";

export const sheetRepository: Repository<CharacterSheet> = {
  async create(character: unknown): Promise<string> {
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
