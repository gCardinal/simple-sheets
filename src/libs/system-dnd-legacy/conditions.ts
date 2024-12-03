import type { Condition } from "./types";

export const conditions: Condition[] = [
  {
    name: "Blinded",
    description: "You cannot see.",
    effects: [
      "A blinded creature can't see and automatically fails any ability check that requires sight.",
      "Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.",
    ],
  },
];
