import type { RendererRegister } from "@libs/character-sheet";

export const register = (): RendererRegister => {
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
