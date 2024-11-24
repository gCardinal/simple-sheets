import { array, assign, type Infer, object } from "@libs/validation";
import { System } from "@libs/character-sheet";

export const DndLegacySystem = assign(
  System,
  object({
    conditions: array(),
    abilityScores: array(),
    skills: array(),
  }),
);

export type DndLegacySystem = Infer<typeof DndLegacySystem>;
