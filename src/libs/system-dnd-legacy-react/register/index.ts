import { type RendererRegistration } from "@libs/character-sheet/models/renderer-registration.ts";

export const register = (): RendererRegistration => {
  console.debug("D&D 5e (Legacy) renderer registered");

  return {
    system: "dnd-legacy",
    versions: [1],
    loadRenderer: async () => {
      const { renderer } = await import("../index");
      return renderer;
    },
  };
};
