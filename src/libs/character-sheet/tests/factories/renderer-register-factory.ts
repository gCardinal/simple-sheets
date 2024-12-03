import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { vi } from "vitest";
import type { RendererRegister } from "../../types";

export const rendererRegisterFactory = Factory.define<RendererRegister>(() => ({
  system: faker.word.noun(),
  versions: [faker.number.int()],
  loadRenderer: vi.fn(),
}));
