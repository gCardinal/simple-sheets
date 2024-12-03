import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { vi } from "vitest";
import type { SystemRegister } from "../../types";

export const systemRegisterFactory = Factory.define<SystemRegister>(() => ({
  name: faker.word.noun(),
  version: faker.number.int(),
  slug: faker.lorem.slug(),
  shortName: faker.location.countryCode(), // Produces two-letter strings
  loadSystem: vi.fn(),
}));
