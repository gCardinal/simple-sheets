import { type Renderer } from "./renderer";

/**
 * Simple object containing the information required to load a renderer. This allows
 * for lazy loading of renderers when they are needed.
 */
export interface RendererRegistration {
  // Slug name of the system, mismatch between system and renderer will throw on registration
  system: string;
  // Versions of the system supported, mismatch between system and renderer will throw on registration
  versions: number[];
  loadRenderer: () => Promise<Renderer>;
}
