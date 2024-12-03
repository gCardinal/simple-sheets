import { describe, expect, it, vi } from "vitest";
import { createRegistrar } from "./create-registrar";
import { createSystemLoader } from "./create-system-loader";
import { CharacterSheetException } from "./exceptions";
import {
  rendererRegisterFactory,
  systemFactory,
  systemRegisterFactory,
} from "./tests";

describe("createSystemLoader()", () => {
  const systemSlug = "test-system";

  it("should create a loader", () => {
    const loadSystem = vi.fn();
    const loader = createSystemLoader(
      createRegistrar([
        [
          systemRegisterFactory.build({ slug: systemSlug, version: 1 }),
          rendererRegisterFactory.build({ system: systemSlug, versions: [1] }),
        ],
      ]),
    );

    expect(loader).toBeDefined();
    expect(loadSystem).not.toHaveBeenCalled();
  });

  it("should load the requested system", async () => {
    const system = systemFactory.build();
    const loadSystem = vi.fn().mockResolvedValue(system);
    const loader = createSystemLoader(
      createRegistrar([
        [
          systemRegisterFactory.build({
            slug: systemSlug,
            version: 1,
            loadSystem,
          }),
          rendererRegisterFactory.build({ system: systemSlug, versions: [1] }),
        ],
      ]),
    );

    const result = await loader.load(systemSlug);

    expect(result).toEqual(system);
  });

  it("should provide cached systems when loading more than once", async () => {
    const loadSystem = vi
      .fn()
      .mockResolvedValue(systemFactory.build({ slug: systemSlug }));
    const loader = createSystemLoader(
      createRegistrar([
        [
          systemRegisterFactory.build({
            slug: systemSlug,
            version: 1,
            loadSystem,
          }),
          rendererRegisterFactory.build({ system: systemSlug, versions: [1] }),
        ],
      ]),
    );

    await loader.load(systemSlug);
    await loader.load(systemSlug);

    expect(loadSystem).toHaveBeenCalledOnce();
  });

  it("should attempt loading the correct system", async () => {
    const loadSystem = vi.fn().mockResolvedValue(systemFactory.build());
    const otherLoadSystem = vi.fn().mockResolvedValue({});
    const loader = createSystemLoader(
      createRegistrar([
        [
          systemRegisterFactory.build({
            slug: "another-system",
            version: 1,
            loadSystem: otherLoadSystem,
          }),
          rendererRegisterFactory.build({
            system: "another-system",
            versions: [1],
          }),
        ],
        [
          systemRegisterFactory.build({
            slug: systemSlug,
            version: 1,
            loadSystem,
          }),
          rendererRegisterFactory.build({ system: systemSlug, versions: [1] }),
        ],
      ]),
    );

    await loader.load(systemSlug);

    expect(loadSystem).toHaveBeenCalled();
    expect(otherLoadSystem).not.toHaveBeenCalled();
  });

  it("should throw if no renderer exists for the requested system", async () => {
    const loader = createSystemLoader(
      createRegistrar([
        [
          systemRegisterFactory.build({ slug: systemSlug, version: 1 }),
          rendererRegisterFactory.build({ system: systemSlug, versions: [1] }),
        ],
      ]),
    );

    await expect(() => loader.load("not-exist")).rejects.toThrow(
      CharacterSheetException.requestedResourceNotFound("not-exist", "system"),
    );
  });
});
