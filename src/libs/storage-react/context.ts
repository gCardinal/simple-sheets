import { createContext } from "react";
import { Storage } from "@libs/storage";

export interface StorageContext {
  storage: Storage;
}

export const storageContext = createContext<StorageContext | null>(null);
