import { CharacterSheetException } from "@libs/character-sheet/exceptions.ts";
import { describe, expect, it } from "vitest";
import { createRegistrar } from "./create-registrar";
import { rendererRegisterFactory, systemRegisterFactory } from "./tests";

describe("createRegistrar()", () => {
  it("should validate mapped systems and renderers are version compatible", () => {
    const slug = "test";

    expect(() => {
      createRegistrar([
        [
          systemRegisterFactory.build({ version: 3, slug }),
          rendererRegisterFactory.build({ system: slug, versions: [1, 2] }),
        ],
      ]);
    }).toThrow(
      CharacterSheetException.registrationFailed([
        CharacterSheetException.rendererVersionMismatch(slug, 3, [1, 2]),
      ]),
    );
  });

  it("should validate mapped systems and renderers share the same slug", () => {
    expect(() => {
      createRegistrar([
        [
          systemRegisterFactory.build({ version: 1, slug: "something" }),
          rendererRegisterFactory.build({
            versions: [1],
            system: "something-else",
          }),
        ],
      ]);
    }).toThrow(
      CharacterSheetException.registrationFailed([
        CharacterSheetException.mismatchedSystemAndRenderer(
          "something",
          "something-else",
        ),
      ]),
    );
  });

  it("should aggregate all encountered issues while validation", () => {
    expect(() => {
      createRegistrar([
        [
          systemRegisterFactory.build({ version: 1, slug: "something" }),
          rendererRegisterFactory.build({
            versions: [2],
            system: "something-else",
          }),
        ],
      ]);
    }).toThrow(
      CharacterSheetException.registrationFailed([
        CharacterSheetException.mismatchedSystemAndRenderer(
          "something",
          "something-else",
        ),
        CharacterSheetException.rendererVersionMismatch("something", 1, [2]),
      ]),
    );
  });

  it("should list all registered systems", () => {
    const firstSystem = systemRegisterFactory.build();
    const secondSystem = systemRegisterFactory.build();

    const registrar = createRegistrar([
      [
        firstSystem,
        rendererRegisterFactory.build({
          system: firstSystem.slug,
          versions: [firstSystem.version],
        }),
      ],
      [
        secondSystem,
        rendererRegisterFactory.build({
          system: secondSystem.slug,
          versions: [secondSystem.version],
        }),
      ],
    ]);

    expect(registrar.getAllSystemRegisters()).toEqual([
      firstSystem,
      secondSystem,
    ]);
  });

  it("should return an empty array should no system be registered", () => {
    const registrar = createRegistrar([]);

    expect(registrar.getAllSystemRegisters()).toEqual([]);
  });

  it("should get a registered system", () => {
    const systemRegister = systemRegisterFactory.build();

    const registrar = createRegistrar([
      [
        systemRegister,
        rendererRegisterFactory.build({
          system: systemRegister.slug,
          versions: [systemRegister.version],
        }),
      ],
    ]);

    expect(registrar.getSystemRegister(systemRegister.slug)).toMatchObject(
      systemRegister,
    );
  });

  it("should throw when attempting to get a registered system that does not exist", () => {
    const registrar = createRegistrar([]);

    expect(() => {
      registrar.getSystemRegister("slug");
    }).toThrow(
      CharacterSheetException.requestedResourceNotFound("slug", "system"),
    );
  });

  it("should get a registered renderer", () => {
    const systemRegister = systemRegisterFactory.build();
    const rendererRegister = rendererRegisterFactory.build({
      system: systemRegister.slug,
      versions: [systemRegister.version],
    });

    const registrar = createRegistrar([[systemRegister, rendererRegister]]);

    expect(registrar.getRendererRegister(systemRegister.slug)).toMatchObject(
      rendererRegister,
    );
  });

  it("should throw when attempting to get a registered renderer that does not exist", () => {
    const registrar = createRegistrar([]);

    expect(() => {
      registrar.getRendererRegister("slug");
    }).toThrow(
      CharacterSheetException.requestedResourceNotFound("slug", "renderer"),
    );
  });
});
