import { CharacterSheet } from "@libs/character-sheet";
import { abilities } from "@libs/system-dnd-legacy/abilities.ts";
import { skills } from "@libs/system-dnd-legacy/skills.ts";
import {
  type Infer,
  assign,
  boolean,
  defaulted,
  number,
  object,
  optional,
  record,
  string,
} from "@libs/validation";

export const DndLegacyCharacterSheet = assign(
  CharacterSheet,
  object({
    classAndLevel: optional(string()),
    proficiencyBonus: defaulted(number(), 2),
    abilityScores: defaulted(
      record(string(), number()),
      abilities.reduce<Record<string, number>>((acc, { shortName }) => {
        acc[shortName] = 8;

        return acc;
      }, {}),
    ),
    skills: defaulted(
      record(
        string(),
        object({
          proficiency: boolean(),
          score: number(),
        }),
      ),
      skills.reduce<Record<string, { proficiency: boolean; score: number }>>(
        (acc, { shortName }) => {
          acc[shortName] = { proficiency: false, score: 0 };

          return acc;
        },
        {},
      ),
    ),
  }),
);

export type DndLegacyCharacterSheet = Infer<typeof DndLegacyCharacterSheet>;
