import { type DndLegacySystem } from "./types";
import { conditions } from "./conditions";
import { abilities } from "./abilities.ts";
import { skills } from "./skills";

export const system: DndLegacySystem = {
  name: "D&D 5e (Legacy)",
  shortName: "D&D 5e (L)",
  slug: "dnd-legacy",
  version: 1,
  conditions,
  abilityScores: abilities,
  skills,
};
