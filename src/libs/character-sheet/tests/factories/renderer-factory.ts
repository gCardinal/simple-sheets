import { Factory } from "fishery";
import { type Renderer } from "../../types";
import { vi } from "vitest";
import { faker } from "@faker-js/faker";

export const rendererFactory = Factory.define<Renderer>(() => ({
  slug: faker.word.noun(),
  render: vi.fn(),
}));
