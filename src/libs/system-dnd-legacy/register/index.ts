import { type SystemRegistrar } from "@libs/character-sheet";

export const register: SystemRegistrar = () => {
  console.log("D&D 5e (Legacy) system registered");

  return {
    name: "D&D 5e (Legacy)",
    slug: "dnd-legacy",
    version: 1,
    loadSystem: async () => {
      const { system } = await import("../index");
      return system;
    },
  };
};
