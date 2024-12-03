import {
  array,
  assign,
  type Infer,
  object,
  func,
  string,
} from "@libs/validation";
import { System } from "@libs/character-sheet";

export const DndLegacySystem = assign(
  System,
  object({
    conditions: array(),
    abilityScores: array(object({ name: string(), shortName: string() })),
    skills: array(),
    formulas: object({
      abilityScoreModifiers: func(),
    }),
  }),
);

export type DndLegacySystem = Infer<typeof DndLegacySystem> & {
  formulas: {
    abilityScoreModifiers: (abilityScore: number) => number;
  };
};
