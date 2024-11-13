import type { Storage } from "@libs/storage";
import { type SystemRegistration } from "@libs/character-sheet";

export interface RouterContext {
  storage: Storage;
  registeredSystems: SystemRegistration[];
}
