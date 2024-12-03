import { type FC } from "react";
import { Group, TextInput } from "@libs/ui";
import { Logo } from "../logo";
import { type UseFormRegister } from "react-hook-form";
import { type DndLegacyCharacterSheet } from "@libs/system-dnd-legacy";

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
