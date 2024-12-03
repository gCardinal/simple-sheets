export interface Condition {
  name: string;
  description: string;
  effects: string[];
}

export interface Ability {
  name: string;
  shortName: string;
}

export interface Skill {
  name: string;
  shortName: string;
  abilityScore: string;
  description: string;
}
