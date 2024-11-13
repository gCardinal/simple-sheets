import { type RpgSystem } from "@libs/character-sheet";

export const register = () => {
  console.log("Darkened Skies system registered");

  return {
    name: "Darkened Skies",
    slug: "darkened-skies",
    version: 1,
    loader: async (): Promise<RpgSystem> => {
      const { system } = await import("../index");
      return system;
    },
  };
};
