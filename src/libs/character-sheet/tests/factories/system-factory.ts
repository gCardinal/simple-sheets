import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import type { System } from "../../models";

export const systemFactory = Factory.define<System>(() => ({
  name: faker.word.noun(),
  version: faker.number.int(),
  slug: faker.lorem.slug(),
  shortName: faker.location.countryCode(), // Produces two-letter strings
}));
