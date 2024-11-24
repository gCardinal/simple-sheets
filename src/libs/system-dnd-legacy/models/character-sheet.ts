import { CharacterSheet } from "@libs/character-sheet";
import {
  assign,
  boolean,
  defaulted,
  type Infer,
  number,
  object,
  optional,
  record,
  string,
} from "@libs/validation";
import { abilities } from "@libs/system-dnd-legacy/abilities.ts";
import { skills } from "@libs/system-dnd-legacy/skills.ts";

export const DndLegacyCharacterSheet = assign(
  CharacterSheet,
  object({
    classAndLevel: optional(string()),
    proficiencyBonus: defaulted(number(), 2),
    abilityScores: defaulted(
      record(string(), number()),
      abilities.reduce(
        (acc, { shortName }) => ({ ...acc, [shortName]: 8 }),
        {},
      ),
    ),
    skills: defaulted(
      record(
        string(),
        object({
          name: string(),
          proficiency: boolean(),
          score: number(),
        }),
      ),
      skills.reduce(
        (acc, { shortName, name }) => ({
          ...acc,
          [shortName]: { name, proficiency: false, score: 0 },
        }),
        {},
      ),
    ),
  }),
);

export type DndLegacyCharacterSheet = Infer<typeof DndLegacyCharacterSheet>;
