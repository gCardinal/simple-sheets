import { type Renderer } from "./models";
import type { CharacterSheetClientOptions } from "./create-character-sheet-client";

/**
 * Lazy loads renderers and caches them in memory.
 */
export const createRendererPool = (
  registrations: CharacterSheetClientOptions["registrations"],
) => {
  const loadedRenderers = new Map<string, Renderer>();

  return {
    get: async (slug: string): Promise<Renderer> => {
      const loadedRenderer = loadedRenderers.get(slug);
      if (loadedRenderer) {
        return loadedRenderer;
      }

      let renderer: Renderer | undefined;

      for (const [, rendererRegistration] of registrations) {
        if (slug === rendererRegistration.system) {
          renderer = await rendererRegistration.loadRenderer();
          loadedRenderers.set(renderer.slug, renderer);
        }
      }

      if (!renderer) {
        throw new Error("nope");
      }

      return renderer;
    },
  };
};

export type RendererPool = ReturnType<typeof createRendererPool>;
