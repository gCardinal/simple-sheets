import { type SystemRegistrar } from "@libs/character-sheet";

export const register: SystemRegistrar = () => {
  console.log("Darkened Skies system registered");

  return {
    name: "Darkened Skies",
    slug: "darkened-skies",
    version: 1,
    loadSystem: async () => {
      const { system } = await import("../index");
      return system;
    },
  };
};
