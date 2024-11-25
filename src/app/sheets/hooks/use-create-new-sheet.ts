import { useCallback } from "react";
import { sheetRepository } from "../sheet-repository.ts";
import { type CharacterSheet } from "@libs/character-sheet";
import { nanoid } from "nanoid";

export const useCreateNewSheet = () => {
  return useCallback(async (name: string, systemSlug: string) => {
    const character: Partial<CharacterSheet> = {
      id: nanoid(),
      name,
      systemSlug,
    };

    return sheetRepository.create(character);
  }, []);
};
