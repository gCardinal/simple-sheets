import type { SystemRegister } from "@libs/character-sheet";

export const register = (): SystemRegister => {
  console.log("Darkened Skies system registered");

  return {
    name: "Darkened Skies",
    shortName: "D&D:DS",
    slug: "darkened-skies",
    version: 1,
    loadSystem: async () => {
      const { system } = await import("../index");
      return system;
    },
  };
};
