import { type Renderer } from "./types";
import type { Registrar } from "./create-registrar";

/**
 * Lazy loads renderers and caches them in memory.
 */
export const createRendererLoader = (registrar: Registrar) => {
  const loadedRenderers = new Map<string, Renderer>();

  return {
    load: async (slug: string): Promise<Renderer> => {
      const loadedRenderer = loadedRenderers.get(slug);
      if (loadedRenderer) {
        return loadedRenderer;
      }

      const rendererRegister = registrar.getRendererRegister(slug);
      const renderer = await rendererRegister.loadRenderer();

      loadedRenderers.set(renderer.slug, renderer);

      return renderer;
    },
  };
};

export type RendererLoader = ReturnType<typeof createRendererLoader>;
