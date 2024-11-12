import { type Storage } from "@libs/storage";
import { useStorageContext } from "./use-storage-context";

export const useStorage = (): Storage => {
  const { storage } = useStorageContext();

  return storage;
};
