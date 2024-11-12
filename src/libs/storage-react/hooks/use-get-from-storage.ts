import { useStorageContext } from "./use-storage-context";
import { assert, type Schema } from "@libs/validation";
import { useEffect, useState } from "react";
import { StorageReactException } from "@libs/storage-react/storage-react.exception.ts";

type GetFromStorageResult<T> = {
  value?: T;
  isFetching: boolean;
  error: Error | null;
};

export const useGetFromStorage = <T>(
  key: string,
  schema: Schema<T>,
): GetFromStorageResult<T> => {
  const [result, setResult] = useState<GetFromStorageResult<T>>({
    value: undefined,
    isFetching: true,
    error: null,
  });
  const { storage } = useStorageContext();

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const data = await storage.getItem(key);

        if (!data) {
          setResult({
            value: undefined,
            isFetching: false,
            error: StorageReactException.noValueFoundInStorage(key),
          });
          return;
        }

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
