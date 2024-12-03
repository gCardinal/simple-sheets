import { dexterityAbility } from "./abilities";
import type { Skill } from "./types";

export const skills: Skill[] = [
  {
    name: "Acrobatics",
    shortName: "acrobatics",
    abilityScore: dexterityAbility.shortName,
    description:
      "Stay on your feet in a tricky situation, or perform an acrobatic stunt.",
  },
];
