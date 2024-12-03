import type {
  DndLegacyCharacterSheet,
  DndLegacySystem,
} from "@libs/system-dnd-legacy";
import { Input, Stack, Text } from "@libs/ui";
import type { FC } from "react";
import { type Control, Controller } from "react-hook-form";

export interface AbilityScoresProps {
  system: DndLegacySystem;
  control: Control<DndLegacyCharacterSheet>;
}

export const AbilityScores: FC<AbilityScoresProps> = ({ system, control }) => {
  return (
    <Stack>
      {system.abilityScores.map(({ shortName }) => (
        <Controller
          key={`abilityScores.${shortName}`}
          control={control}
          name={`abilityScores.${shortName}`}
          render={({ field }) => (
            <Stack>
              <Text>{shortName.toUpperCase()}</Text>
              <Input
                {...field}
                onChange={(event) => {
                  const newValue = Number.parseInt(event.target.value, 10);
                  field.onChange(
                    Number.isNaN(newValue) ? field.value : newValue,
                  );
                }}
              />
              <Text>{system.formulas.abilityScoreModifiers(field.value)}</Text>
            </Stack>
          )}
        />
      ))}
    </Stack>
  );
};
