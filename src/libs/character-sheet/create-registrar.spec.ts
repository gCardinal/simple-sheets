import { describe, expect, it } from "vitest";
import {
  rendererRegistrationFactory,
  systemRegistrationFactory,
} from "./tests";
import { createRegistrar } from "./create-registrar";

describe("createRegistrar()", () => {
  it("should list all registered systems", () => {
    const firstSystem = systemRegistrationFactory.build();
    const secondSystem = systemRegistrationFactory.build();

    const registrar = createRegistrar([
      [
        firstSystem,
        rendererRegistrationFactory.build({ system: firstSystem.slug }),
      ],
      [
        secondSystem,
        rendererRegistrationFactory.build({ system: secondSystem.slug }),
      ],
    ]);

    expect(registrar.getAllSystemRegisters()).toEqual([
      firstSystem,
      secondSystem,
    ]);
  });

  it("should return an empty array should no system be registered", () => {});

  it("should get a registerer system", () => {});

  it("should throw when attempting to get a registered system that does not exist", () => {});
});
