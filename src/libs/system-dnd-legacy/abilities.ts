import { type Ability } from "./types";

export const strengthAbility: Ability = { name: "Strength", shortName: "str" };
export const dexterityAbility: Ability = {
  name: "Dexterity",
  shortName: "dex",
};
export const constitutionAbility: Ability = {
  name: "Constitution",
  shortName: "con",
};
export const intelligenceAbility: Ability = {
  name: "Intelligence",
  shortName: "int",
};
export const wisdomAbility: Ability = { name: "Wisdom", shortName: "wis" };
export const charismaAbility: Ability = { name: "Charisma", shortName: "cha" };

export const abilities: Ability[] = [
  strengthAbility,
  dexterityAbility,
  constitutionAbility,
  intelligenceAbility,
  wisdomAbility,
  charismaAbility,
];
