import { type Storage } from "@libs/storage";
import { type MinimalCharacter } from "./minimal-character.ts";

export interface RpgSystem {
  name: string;
  slug: string;
  version: number;
  runMigrations: (
    character: MinimalCharacter,
    storage: Storage,
  ) => Promise<void>;
}
