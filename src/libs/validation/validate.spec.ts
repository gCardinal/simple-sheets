import { describe, expect, test } from "vitest";
import { validate } from "./validate";
import { string, StructError } from "superstruct";

describe("validate", () => {
  test("should return no error when value satisfies schema", () => {
    const validationResult = validate("a string", string());

    expect(validationResult).toBeNull();
  });

  test("should return a detailed error when validation has failed", () => {
    const validationResult = validate(123, string());

    expect(validationResult).toBeInstanceOf(StructError);
    expect(validationResult?.message).toMatch(
      "Expected a string, but received: 123",
    );
  });
});
