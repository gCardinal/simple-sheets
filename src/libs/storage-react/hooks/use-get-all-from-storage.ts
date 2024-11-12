import { useStorageContext } from "./use-storage-context";
import { useQuery } from "@tanstack/react-query";
import { assert, type Schema } from "@libs/validation";
import { useEffect, useMemo, useState } from "react";
import { storageKeyPrefix } from "../constants.ts";
import { StorageReactException } from "@libs/storage-react/storage-react.exception.ts";

type GetAllFromStorageResult<T> = {
  values: T[];
  isFetching: boolean;
  error: Error | null;
};

export const useGetAllFromStorage = <T>(
  schema: Schema<T[]>,
): GetAllFromStorageResult<T> => {
  const { storage } = useStorageContext();
  const [result, setResult] = useState<GetAllFromStorageResult<T>>({
    values: [],
    isFetching: true,
    error: null,
  });

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const keys = await storage.keys();
        const values = [];

        for (const key of keys) {
          const data = await storage.getItem(key);

          if (!data) {
            return;
          }

          values.push(data);
        }

        // @todo: NOPE. These are low level, validation happens in concrete hooks, not here.
        assert(data, schema);

        setResult({ value: data, isFetching: false, error: null });
      } catch (error) {
        setResult({
          value: undefined,
          isFetching: false,
          error:
            error instanceof Error
              ? error
              : StorageReactException.unknownError(error),
        });
      }
    };

    void asyncEffect();
  }, [key, schema, storage]);

  return result;
};
