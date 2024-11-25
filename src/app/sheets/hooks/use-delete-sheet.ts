import { db } from "../../db.ts";
import { useCallback } from "react";

export const useDeleteSheet = () => {
  return useCallback(async (id: string) => {
    await db.sheets.delete(id);
  }, []);
};
