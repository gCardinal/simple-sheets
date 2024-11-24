import { type FC } from "react";
import {
  type DndLegacyCharacterSheet,
  type DndLegacySystem,
} from "@libs/system-dnd-legacy";

export interface CharacterSheetProps {
  sheet: DndLegacyCharacterSheet;
  system: DndLegacySystem;
}

export const CharacterSheet: FC<CharacterSheetProps> = ({ sheet }) => {
  return (
    <div>
      <p>
        {sheet.name}, {sheet.classAndLevel} (Legacy)
      </p>
      <pre>{JSON.stringify(sheet, null, 2)}</pre>
    </div>
  );
};
