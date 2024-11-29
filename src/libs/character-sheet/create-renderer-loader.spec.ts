import { describe, expect, it, vi } from "vitest";
import { createRendererLoader } from "./create-renderer-loader";
import { CharacterSheetException } from "@libs/character-sheet/exceptions.ts";
import {
  rendererFactory,
  rendererRegistrationFactory,
  systemRegistrationFactory,
} from "@libs/character-sheet/tests";

describe("createRendererLoader()", () => {
  const systemSlug = "test-system";

  it("should create a loader", () => {
    const loadRenderer = vi.fn();
    const loader = createRendererLoader([
      [systemRegistrationFactory.build(), rendererRegistrationFactory.build()],
    ]);

    expect(loader).toBeDefined();
    expect(loadRenderer).not.toHaveBeenCalled();
  });

  it("should load the requested system renderer", async () => {
    const renderer = rendererFactory.build();
    const loadRenderer = vi.fn().mockResolvedValue(renderer);
    const loader = createRendererLoader([
      [
        systemRegistrationFactory.build({ slug: systemSlug }),
        rendererRegistrationFactory.build({ system: systemSlug, loadRenderer }),
      ],
    ]);

    const result = await loader.load(systemSlug);

    expect(result).toEqual(renderer);
  });

  it("should provide cached renderers when loading more than once", async () => {
    const loadRenderer = vi
      .fn()
      .mockResolvedValue(rendererFactory.build({ slug: systemSlug }));
    const loader = createRendererLoader([
      [
        systemRegistrationFactory.build({ slug: systemSlug }),
        rendererRegistrationFactory.build({ system: systemSlug, loadRenderer }),
      ],
    ]);

    await loader.load(systemSlug);
    await loader.load(systemSlug);

    expect(loadRenderer).toHaveBeenCalledOnce();
  });

  it("should attempt loading the correct renderer", async () => {
    const loadRenderer = vi.fn().mockResolvedValue(rendererFactory.build());
    const otherSystemLoadRenderer = vi.fn().mockResolvedValue({});
    const loader = createRendererLoader([
      [
        systemRegistrationFactory.build({ slug: "other-system" }),
        rendererRegistrationFactory.build({
          system: "other-system",
          loadRenderer: otherSystemLoadRenderer,
        }),
      ],
      [
        systemRegistrationFactory.build({ slug: systemSlug }),
        rendererRegistrationFactory.build({ system: systemSlug, loadRenderer }),
      ],
    ]);

    await loader.load(systemSlug);

    expect(loadRenderer).toHaveBeenCalled();
    expect(otherSystemLoadRenderer).not.toHaveBeenCalled();
  });

  it("should throw if no renderer exists for the requested system", async () => {
    const loader = createRendererLoader([
      [systemRegistrationFactory.build(), rendererRegistrationFactory.build()],
    ]);

    await expect(() => loader.load("not-exist")).rejects.toThrow(
      CharacterSheetException.requestedSystemNotFound(
        "not-exist",
        "load-renderer",
      ),
    );
  });
});
