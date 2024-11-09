import { useStorageContext } from "./use-storage-context";
import { useQuery } from "@tanstack/react-query";
import { assert, Schema } from "@libs/validation";
import { useEffect, useMemo } from "react";

type GetAllFromStorageResult<T> = { values: T[]; isLoading: boolean };

export const useGetAllFromStorage = <T>(
  schema: Schema<T>,
): GetAllFromStorageResult<T> => {
  const { storage } = useStorageContext();
  const { data, ...meta } = useQuery({
    queryKey: [`storage-react-get-all`],
    queryFn: async () => {
      const keys = await storage.keys();

      return Promise.all(keys.map((key) => storage.getItem<T>(key)));
    },
  });

  useEffect(() => {
    if (data) {
      assert(data, schema);
    }
  }, [data, schema]);

  return useMemo(
    () =>
      data && !meta.isLoading
        ? { values: data.filter(Boolean), ...meta }
        : { values: [], ...meta },
    [data, meta],
  );
};
