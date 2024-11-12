import localforage from "localforage";
import { inMemoryStorageDriver } from "./drivers";

export type Storage = Omit<
  LocalForage,
  "WEBSQL" | "INDEXEDDB" | "LOCALSTORAGE"
>;

export const createStorage = localforage.createInstance;
export const drivers = {
  INDEXEDDB: localforage.INDEXEDDB,
  LOCALSTORAGE: localforage.LOCALSTORAGE,
  WEBSQL: localforage.WEBSQL,
  IN_MEMORY: inMemoryStorageDriver._driver,
};

void localforage.defineDriver(inMemoryStorageDriver);
