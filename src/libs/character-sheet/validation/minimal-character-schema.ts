import { object, string, number } from "@libs/validation";

export const minimalCharacterSchema = object({
  id: string(),
  name: string(),
  slug: string(),
  system: object({
    slug: string(),
    version: number(),
    name: string(),
  }),
});
