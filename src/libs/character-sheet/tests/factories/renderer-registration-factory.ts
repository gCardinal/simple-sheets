import { Factory } from "fishery";
import { type RendererRegister } from "../../types";
import { vi } from "vitest";
import { faker } from "@faker-js/faker";

export const rendererRegistrationFactory = Factory.define<RendererRegister>(
  () => ({
    system: faker.word.noun(),
    versions: [faker.number.int()],
    loadRenderer: vi.fn(),
  }),
);
