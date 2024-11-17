import type { RendererRegistration } from "@libs/character-sheet/models/renderer-registration.ts";

export const register = (): RendererRegistration => {
  console.log("Darkened Skies renderer registered");

  return {
    system: "darkened-skies",
    versions: [1],
    loadRenderer: async () => {
      const { renderer } = await import("../index");
      return renderer;
    },
  };
};
