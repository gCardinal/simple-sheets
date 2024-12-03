import type { System } from "@libs/character-sheet";

export interface Condition {
  name: string;
  description: string;
  effects: string[];
}

export interface DarkenedSkiesSystem extends System {
  conditions: Condition[];
}
