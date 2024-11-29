import { type SystemRegister } from "@libs/character-sheet";

export const register = (): SystemRegister => {
  console.log("D&D 5e (Legacy) system registered");

  return {
    name: "D&D 5e (Legacy)",
    shortName: "D&D 5e (L)",
    slug: "dnd-legacy",
    version: 1,
    loadSystem: async () => {
      const { system } = await import("../index");
      return system;
    },
  };
};
