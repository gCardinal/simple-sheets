import { type FC } from "react";
import {
  type DndLegacyCharacterSheet,
  type DndLegacySystem,
} from "@libs/system-dnd-legacy";
import { type DataBridge } from "@libs/character-sheet";

export interface CharacterSheetProps {
  sheet: DndLegacyCharacterSheet;
  system: DndLegacySystem;
  bridge: DataBridge;
}

const getRandomClass = () => {
  const classes = ["Wizard", "Fighter", "Rogue", "Cleric"];
  return classes[Math.floor(Math.random() * classes.length)];
};

const getRandomLevel = () => {
  return Math.ceil(Math.random() * 10);
};

export const CharacterSheet: FC<CharacterSheetProps> = ({ sheet, bridge }) => {
  return (
    <div>
      <p>
        {sheet.name}, {sheet.classAndLevel} (Legacy)
      </p>
      <button
        onClick={() => {
          bridge.saveSheet({
            ...sheet,
            classAndLevel: `${getRandomClass()} ${getRandomLevel()}`,
          });
        }}
      >
        Save some shiz
      </button>
      <pre>{JSON.stringify(sheet, null, 2)}</pre>
    </div>
  );
};
