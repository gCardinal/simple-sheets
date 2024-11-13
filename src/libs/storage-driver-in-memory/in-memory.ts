import { getSerializer } from "localforage";
import { IN_MEMORY_DRIVER_NAME } from "@libs/storage-driver-in-memory/constants.ts";

interface DriverProperties {
  storage: Map<string, string>;
  serializer: LocalForageSerializer | undefined;
}

export const inMemoryStorageDriver: LocalForageDriver & DriverProperties = {
  _driver: IN_MEMORY_DRIVER_NAME,
  storage: new Map(),
  serializer: undefined,
  _initStorage: async function () {
    this.storage = new Map();
    this.serializer = await getSerializer();
  },
  clear: async function () {
    this.storage = new Map();
  },
  getItem: async function <T>(key: string): Promise<T | null> {
    const item = this.storage.get(key);

    if (!item) {
      return null;
    }

    return this.serializer?.deserialize<T>(item) as T;
  },
  iterate: function () {
    throw new Error("Method not implemented.");
  },
  key: function () {
    throw new Error("Method not implemented.");
  },
  keys: async function (): Promise<string[]> {
    return [...this.storage.keys()];
  },
  length: async function (): Promise<number> {
    return this.storage.size;
  },
  removeItem: async function (key): Promise<void> {
    this.storage.delete(key);
  },
  setItem: async function <T>(key: string, value: T): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.serializer) {
        reject(new Error("Serializer is not defined"));
        return;
      }

      this.serializer.serialize(value, (serializedValue, error) => {
        if (error) {
          reject(error);
          return;
        }

        this.storage.set(key, serializedValue);
        resolve(value);
      });
    });
  },
};
