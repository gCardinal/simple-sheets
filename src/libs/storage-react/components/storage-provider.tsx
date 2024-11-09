import { FC, PropsWithChildren } from "react";
import { storageContext } from "../context";
import { Storage } from "@libs/storage";

export interface StorageProviderProps extends PropsWithChildren {
  storage: Storage;
}

export const StorageProvider: FC<StorageProviderProps> = ({
  children,
  storage,
}) => (
  <storageContext.Provider value={{ storage }}>
    {children}
  </storageContext.Provider>
);
