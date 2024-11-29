import { describe, expect, it, vi } from "vitest";
import { createSystemLoader } from "./create-system-loader";
import { CharacterSheetException } from "./exceptions";
import {
  rendererRegistrationFactory,
  systemFactory,
  systemRegistrationFactory,
} from "./tests";

describe("createSystemLoader()", () => {
  const systemSlug = "test-system";

  it("should create a loader", () => {
    const loadSystem = vi.fn();
    const loader = createSystemLoader([
      [systemRegistrationFactory.build(), rendererRegistrationFactory.build()],
    ]);

    expect(loader).toBeDefined();
    expect(loadSystem).not.toHaveBeenCalled();
  });

  it("should load the requested system", async () => {
    const system = systemFactory.build();
    const loadSystem = vi.fn().mockResolvedValue(system);
    const loader = createSystemLoader([
      [
        systemRegistrationFactory.build({ slug: systemSlug, loadSystem }),
        rendererRegistrationFactory.build(),
      ],
    ]);

    const result = await loader.load(systemSlug);

    expect(result).toEqual(system);
  });

  it("should provide cached systems when loading more than once", async () => {
    const loadSystem = vi
      .fn()
      .mockResolvedValue(systemFactory.build({ slug: systemSlug }));
    const loader = createSystemLoader([
      [
        systemRegistrationFactory.build({ slug: systemSlug, loadSystem }),
        rendererRegistrationFactory.build(),
      ],
    ]);

    await loader.load(systemSlug);
    await loader.load(systemSlug);

    expect(loadSystem).toHaveBeenCalledOnce();
  });

  it("should attempt loading the correct system", async () => {
    const loadSystem = vi.fn().mockResolvedValue(systemFactory.build());
    const otherLoadSystem = vi.fn().mockResolvedValue({});
    const loader = createSystemLoader([
      [
        systemRegistrationFactory.build({
          slug: "another-system",
          loadSystem: otherLoadSystem,
        }),
        rendererRegistrationFactory.build({ system: "another-system" }),
      ],
      [
        systemRegistrationFactory.build({ slug: systemSlug, loadSystem }),
        rendererRegistrationFactory.build({ system: systemSlug }),
      ],
    ]);

    await loader.load(systemSlug);

    expect(loadSystem).toHaveBeenCalled();
    expect(otherLoadSystem).not.toHaveBeenCalled();
  });

  it("should throw if no renderer exists for the requested system", async () => {
    const loader = createSystemLoader([
      [systemRegistrationFactory.build(), rendererRegistrationFactory.build()],
    ]);

    await expect(() => loader.load("not-exist")).rejects.toThrow(
      CharacterSheetException.requestedSystemNotFound(
        "not-exist",
        "load-system",
      ),
    );
  });

  it("should list all registered systems", () => {});
  it("should return an empty array should no system be registered", () => {});
  it("should get a registerer system", () => {});
  it("should throw when attempting to get a registered system that does not exist", () => {});
});
