import { Factory } from "fishery";
import { type RendererRegistration } from "../../types";
import { vi } from "vitest";
import { faker } from "@faker-js/faker";

export const rendererRegistrationFactory = Factory.define<RendererRegistration>(
  () => ({
    system: faker.word.noun(),
    versions: [faker.number.int()],
    loadRenderer: vi.fn(),
  }),
);
