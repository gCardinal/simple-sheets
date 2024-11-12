import { useContext } from "react";
import { type StorageContext, storageContext } from "../context";
import { StorageReactException } from "../storage-react.exception";

export const useStorageContext = (): StorageContext => {
  const context = useContext(storageContext);

  if (!context) {
    throw StorageReactException.noContext();
  }

  return context;
};
