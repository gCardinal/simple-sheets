import { Driver } from "../../driver.ts";
import { DriverException } from "../driver.exception.ts";
import { CreateIndexedDbDriverOptions } from "./create-indexed-db-driver-options.ts";

export const createIndexedDBDriver = async (
  options: CreateIndexedDbDriverOptions,
): Promise<Driver> => {
  let database: IDBDatabase;

  return {
    ...options,
    connect: async () =>
      new Promise((resolve, reject) => {
        const dbOpenRequest = window.indexedDB.open(
          options.databaseName,
          options.version,
        );

        dbOpenRequest.onerror = (event) => {
          reject(DriverException.failedToOpenConnection(options, event));
        };

        dbOpenRequest.onsuccess = () => {
          database = dbOpenRequest.result;
          resolve();
        };

        dbOpenRequest.onupgradeneeded = () => {
          // @todo: if migrations ever required
        };
      }),
    save: async <E>(table: string, entity: E): Promise<E> =>
      new Promise((resolve, reject) => {
        const transaction = database.transaction(table, "readwrite");
        const store = transaction.objectStore(table);
        const request = store.add(entity);

        request.onsuccess = () => {
          resolve(entity);
        };

        request.onerror = (event) => {
          reject(event);
        };
      }),
  };
};
