import { type Renderer, type SystemAndRendererRegistrationMap } from "./types";
import { CharacterSheetException } from "./exceptions";

/**
 * Lazy loads renderers and caches them in memory.
 */
export const createRendererLoader = (
  registrations: SystemAndRendererRegistrationMap,
) => {
  const loadedRenderers = new Map<string, Renderer>();

  return {
    load: async (slug: string): Promise<Renderer> => {
      const loadedRenderer = loadedRenderers.get(slug);
      if (loadedRenderer) {
        return loadedRenderer;
      }

      for (const [, rendererRegistration] of registrations) {
        if (slug === rendererRegistration.system) {
          const renderer = await rendererRegistration.loadRenderer();
          loadedRenderers.set(renderer.slug, renderer);
          return renderer;
        }
      }

      throw CharacterSheetException.requestedSystemNotFound(
        slug,
        "load-renderer",
      );
    },
  };
};

export type RendererLoader = ReturnType<typeof createRendererLoader>;
