import { type Renderer } from "@libs/character-sheet";
import {
  DndLegacyCharacterSheet,
  DndLegacySystem,
} from "@libs/system-dnd-legacy";
import { assert, create } from "@libs/validation";
import { CharacterSheet } from "./components";

export const render: Renderer["render"] = (character, system) => {
  const validatedCharacter = create(character, DndLegacyCharacterSheet);
  assert(system, DndLegacySystem);

  return <CharacterSheet sheet={validatedCharacter} system={system} />;
};
