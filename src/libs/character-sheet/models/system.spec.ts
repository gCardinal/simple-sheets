import { describe, expect, it } from "vitest";
import { System } from "./system";
import { validate } from "@libs/validation";

describe("System", () => {
  it("should validate", () => {
    const system: System = {
      name: "Test System",
      shortName: "TS",
      slug: "test",
      version: 1,
    };

    const [error, validatedSystem] = validate(system, System);

    expect(error).toBeUndefined();
    expect(validatedSystem).toMatchObject(system);
  });

  it("should allows extra properties", () => {
    const system: System = {
      name: "Test System",
      shortName: "TS",
      slug: "test",
      version: 1,
      extra: "property",
    };

    const [error, validatedSystem] = validate(system, System);

    expect(error).toBeUndefined();
    expect(validatedSystem).toMatchObject(system);
  });
});
