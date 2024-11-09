import { useStorageContext } from "./use-storage-context";
import { useQuery } from "@tanstack/react-query";
import { assert, Schema } from "@libs/validation";
import { useMemo } from "react";
import { storageKeyPrefix } from "../constants";

type GetFromStorageResult<T> =
  | { value: T; isLoading: false }
  | { value: undefined; isLoading: true };

export const useGetFromStorage = <T>(
  key: string,
  schema: Schema<T>,
): GetFromStorageResult<T> => {
  const { storage } = useStorageContext();
  const { data, ...meta } = useQuery({
    queryKey: [`${storageKeyPrefix}-get-${key}`],
    queryFn: () => storage.getItem(key),
  });

  return useMemo(() => {
    if (data && !meta.isLoading) {
      assert(data, schema);
      return { value: data, ...meta, isLoading: false };
    }

    return { value: undefined, ...meta, isLoading: true };
  }, [data, schema, meta]);
};
