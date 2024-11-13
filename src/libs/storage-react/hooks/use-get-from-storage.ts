import { useStorageContext } from "./use-storage-context";
import { useEffect, useState } from "react";
import { StorageReactException } from "../storage-react.exception";

type GetFromStorageResult = {
  value?: unknown;
  isFetching: boolean;
  error: Error | null;
};

export const useGetFromStorage = (key: string): GetFromStorageResult => {
  const [result, setResult] = useState<GetFromStorageResult>({
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
  }, [key, storage]);

  return result;
};
