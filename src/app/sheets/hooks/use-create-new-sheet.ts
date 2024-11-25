import { useCallback } from "react";
import { sheetRepository } from "../sheet-repository.ts";

export const useCreateNewSheet = () => {
  return useCallback(async (name: string, systemSlug: string) => {
    return sheetRepository.create(name, systemSlug);
  }, []);
};
