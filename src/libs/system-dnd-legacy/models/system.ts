import { System } from "@libs/character-sheet";
import {
  type Infer,
  array,
  assign,
  func,
  object,
  string,
} from "@libs/validation";

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
