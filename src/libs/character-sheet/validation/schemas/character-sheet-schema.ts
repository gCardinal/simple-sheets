import { object, string, number, type Describe } from "@libs/validation";
import { type CharacterSheet } from "../../models";

export const characterSheetSchema: Describe<CharacterSheet> = object({
  id: string(),
  name: string(),
  system: object({
    slug: string(),
    version: number(),
    name: string(),
    shortName: string(),
  }),
});
