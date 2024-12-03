import { superstructResolver } from "@hookform/resolvers/superstruct";
import type { DataBridge } from "@libs/character-sheet";
import {
  DndLegacyCharacterSheet,
  type DndLegacySystem,
} from "@libs/system-dnd-legacy";
import { Button } from "@libs/ui";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { AbilityScores } from "../ability-scores";
import { SheetHeader } from "../sheet-header";

export interface CharacterSheetProps {
  sheet: DndLegacyCharacterSheet;
  system: DndLegacySystem;
  bridge: DataBridge;
}

export const CharacterSheet: FC<CharacterSheetProps> = ({
  sheet,
  bridge,
  system,
}) => {
  const { handleSubmit, register, control } = useForm<DndLegacyCharacterSheet>({
    values: sheet,
    resolver: superstructResolver(DndLegacyCharacterSheet),
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          (newSheet) => {
            bridge.saveSheet(newSheet);
          },
          (errors, b) => {
            console.log(errors, b);
          },
        )}
      >
        <SheetHeader register={register} />
        <AbilityScores control={control} system={system} />
        <Button pos="fixed" right={12} bottom={12} type="submit">
          Save some shiz
        </Button>
      </form>
    </div>
  );
};
