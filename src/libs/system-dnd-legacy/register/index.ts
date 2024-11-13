import { type RpgSystem } from "@libs/character-sheet";

export const register = () => {
  console.log("D&D 5e (Legacy) system registered");

  return {
    name: "D&D 5e (Legacy)",
    slug: "dnd-legacy",
    version: 1,
    loader: async (): Promise<RpgSystem> => {
      const { system } = await import("../index");
      return system;
    },
  };
};
