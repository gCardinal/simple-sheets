import { describe, expect, it, vi } from "vitest";
import { createRendererLoader } from "./create-renderer-loader";
import { CharacterSheetException } from "./exceptions";
import {
  rendererFactory,
  rendererRegisterFactory,
  systemRegisterFactory,
} from "./tests";
import { createRegistrar } from "./create-registrar";

describe("createRendererLoader()", () => {
  const systemSlug = "test-system";

  it("should create a loader", () => {
    const loadRenderer = vi.fn();
    const loader = createRendererLoader(
      createRegistrar([
        [
          systemRegisterFactory.build({ slug: systemSlug, version: 1 }),
          rendererRegisterFactory.build({ system: systemSlug, versions: [1] }),
        ],
      ]),
    );

    expect(loader).toBeDefined();
    expect(loadRenderer).not.toHaveBeenCalled();
  });

  it("should load the requested system renderer", async () => {
    const renderer = rendererFactory.build();
    const loadRenderer = vi.fn().mockResolvedValue(renderer);
    const loader = createRendererLoader(
      createRegistrar([
        [
          systemRegisterFactory.build({ slug: systemSlug, version: 1 }),
          rendererRegisterFactory.build({
            system: systemSlug,
            versions: [1],
            loadRenderer,
          }),
        ],
      ]),
    );

    const result = await loader.load(systemSlug);

    expect(result).toEqual(renderer);
  });

  it("should provide cached renderers when loading more than once", async () => {
    const loadRenderer = vi
      .fn()
      .mockResolvedValue(rendererFactory.build({ slug: systemSlug }));
    const loader = createRendererLoader(
      createRegistrar([
        [
          systemRegisterFactory.build({ slug: systemSlug, version: 1 }),
          rendererRegisterFactory.build({
            system: systemSlug,
            versions: [1],
            loadRenderer,
          }),
        ],
      ]),
    );

    await loader.load(systemSlug);
    await loader.load(systemSlug);

    expect(loadRenderer).toHaveBeenCalledOnce();
  });

  it("should attempt loading the correct renderer", async () => {
    const loadRenderer = vi.fn().mockResolvedValue(rendererFactory.build());
    const otherSystemLoadRenderer = vi.fn().mockResolvedValue({});
    const loader = createRendererLoader(
      createRegistrar([
        [
          systemRegisterFactory.build({ slug: "other-system", version: 1 }),
          rendererRegisterFactory.build({
            system: "other-system",
            versions: [1],
            loadRenderer: otherSystemLoadRenderer,
          }),
        ],
        [
          systemRegisterFactory.build({ slug: systemSlug, version: 1 }),
          rendererRegisterFactory.build({
            system: systemSlug,
            versions: [1],
            loadRenderer,
          }),
        ],
      ]),
    );

    await loader.load(systemSlug);

    expect(loadRenderer).toHaveBeenCalled();
    expect(otherSystemLoadRenderer).not.toHaveBeenCalled();
  });

  it("should throw if no renderer exists for the requested system", async () => {
    const loader = createRendererLoader(
      createRegistrar([
        [
          systemRegisterFactory.build({ slug: systemSlug, version: 1 }),
          rendererRegisterFactory.build({ system: systemSlug, versions: [1] }),
        ],
      ]),
    );

    await expect(() => loader.load("not-exist")).rejects.toThrow(
      CharacterSheetException.requestedResourceNotFound(
        "not-exist",
        "renderer",
      ),
    );
  });
});
