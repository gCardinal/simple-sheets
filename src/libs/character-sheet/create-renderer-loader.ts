import { type Renderer, type SystemAndRendererRegistrationMap } from "./types";

/**
 * Lazy loads renderers and caches them in memory.
 */
export const createRendererLoader = (
  registrations: SystemAndRendererRegistrationMap,
) => {
  const loadedRenderers = new Map<string, Renderer>();

  return {
    get: async (slug: string): Promise<Renderer> => {
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

      throw new Error("nope");
    },
  };
};

export type RendererLoader = ReturnType<typeof createRendererLoader>;
