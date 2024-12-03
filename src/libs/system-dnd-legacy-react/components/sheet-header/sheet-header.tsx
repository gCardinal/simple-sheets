import type { DndLegacyCharacterSheet } from "@libs/system-dnd-legacy";
import { Group, TextInput } from "@libs/ui";
import type { FC } from "react";
import type { UseFormRegister } from "react-hook-form";
import { Logo } from "../logo";

export interface SheetHeaderProps {
  register: UseFormRegister<DndLegacyCharacterSheet>;
}

export const SheetHeader: FC<SheetHeaderProps> = ({ register }) => {
  return (
    <Group>
      <Logo title="D&D Logo" titleId="dnd-logo" />
      <Group>
        <TextInput label="Name" {...register("name")} />
        <TextInput label="Class & Level" {...register("classAndLevel")} />
      </Group>
    </Group>
  );
};
