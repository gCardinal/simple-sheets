import type { Storage } from "@libs/storage";
import { type SystemRegister } from "@libs/character-sheet/system-register.ts";

export interface RouterContext {
  storage: Storage;
  registeredSystems: SystemRegister[];
}
