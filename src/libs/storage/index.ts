import localforage from "localforage";

export type Storage = Omit<
  LocalForage,
  "WEBSQL" | "INDEXEDDB" | "LOCALSTORAGE"
>;

export const createStorage = localforage.createInstance;
export const drivers = {
  INDEXEDDB: localforage.INDEXEDDB,
  LOCALSTORAGE: localforage.LOCALSTORAGE,
  WEBSQL: localforage.WEBSQL,
};
