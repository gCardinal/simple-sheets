import { beforeEach, describe, expect, test } from "vitest";
import { createStorage, type Storage } from "@libs/storage";
import { inMemoryStorageDriver } from "./in-memory";

describe("storage driver: in-memory", () => {
  let storage: Storage;

  beforeEach(() => {
    storage = createStorage({});

    storage.defineDriver(inMemoryStorageDriver);
    storage.setDriver(inMemoryStorageDriver._driver);
  });

  test("should set and get value from storage", async () => {
    const value = { a: "1", b: 2 };

    await storage.setItem("key", value);

    expect(await storage.getItem("key")).toEqual(value);
  });

  test("should remove value from storage", async () => {
    await storage.setItem("key", "value");
    await storage.removeItem("key");

    expect(await storage.getItem("key")).toBeNull();
  });

  test("should clear storage", async () => {
    await storage.setItem("key1", "value1");
    await storage.setItem("key2", "value2");

    await storage.clear();

    expect(await storage.getItem("key1")).toBeNull();
    expect(await storage.getItem("key2")).toBeNull();
  });

  test("should get all keys from storage", async () => {
    await storage.setItem("key1", "value1");
    await storage.setItem("key2", "value2");

    expect(await storage.keys()).toEqual(["key1", "key2"]);
  });

  test("should get length of storage", async () => {
    await storage.setItem("key1", "value1");
    await storage.setItem("key2", "value2");

    expect(await storage.length()).toBe(2);
  });
});
