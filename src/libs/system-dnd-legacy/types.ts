import { type System } from "@libs/character-sheet";

export interface Condition {
  name: string;
  description: string;
  effects: string[];
}

export interface AbilityScore {
  name: string;
  shortName: string;
}

export interface Skill {
  name: string;
  abilityScore: string;
  description: string;
}

export interface DndLegacySystem extends System {
  conditions: Condition[];
  abilityScores: AbilityScore[];
  skills: Skill[];
}
