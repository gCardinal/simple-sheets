import { Factory } from "fishery";
import { type SystemRegistration } from "../../types";
import { vi } from "vitest";
import { faker } from "@faker-js/faker";

export const systemRegistrationFactory = Factory.define<SystemRegistration>(
  () => ({
    name: faker.word.noun(),
    version: faker.number.int(),
    slug: faker.lorem.slug(),
    shortName: faker.location.countryCode(), // Produces two-letter strings
    loadSystem: vi.fn(),
  }),
);
