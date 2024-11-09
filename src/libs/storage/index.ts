import localforage from "localforage";

/**
 * Basic abstraction over the localforage library.
 */
export type Storage = Omit<
  LocalForage,
  "WEBSQL" | "INDEXEDDB" | "LOCALSTORAGE"
>;

export const storage: Storage = localforage;
export const drivers = {
  INDEXEDDB: localforage.INDEXEDDB,
  LOCALSTORAGE: localforage.LOCALSTORAGE,
  WEBSQL: localforage.WEBSQL,
};
