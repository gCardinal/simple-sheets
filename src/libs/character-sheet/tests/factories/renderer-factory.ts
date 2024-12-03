import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { vi } from "vitest";
import type { Renderer } from "../../types";

export const rendererFactory = Factory.define<Renderer>(() => ({
  slug: faker.word.noun(),
  render: vi.fn(),
}));
