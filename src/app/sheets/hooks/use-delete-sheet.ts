import { useCallback } from "react";
import { db } from "../../db.ts";

export const useDeleteSheet = () => {
  return useCallback(async (id: string) => {
    await db.sheets.delete(id);
  }, []);
};
