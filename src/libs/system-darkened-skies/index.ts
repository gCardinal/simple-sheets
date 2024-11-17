import { type DarkenedSkiesSystem } from "./system";

console.log("Darkened Skies system loaded");

export * from "./system";

export const system: DarkenedSkiesSystem = {
  name: "Darkened Skies",
  slug: "darkened-skies",
  version: 1,
  conditions: [
    {
      name: "Blinded",
      description: "You cannot see.",
      effects: [
        "A blinded creature can't see and automatically fails any ability check that requires sight.",
        "Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.",
      ],
    },
  ],
};
