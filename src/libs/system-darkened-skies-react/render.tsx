import type { CharacterSheet } from "@libs/character-sheet";
import type { DarkenedSkiesSystem } from "@libs/system-darkened-skies";

export const render = (
  character: CharacterSheet,
  system: DarkenedSkiesSystem,
) => {
  return (
    <div>
      <h1>{character.name}</h1>
      <p>{system.conditions.map(({ name }) => name)}</p>
    </div>
  );
};
