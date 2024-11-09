import { storage as libStorage } from "@libs/storage";
import { config } from "@libs/config";

export const storage = libStorage.createInstance({
  driver: config.storage.driver,
  version: config.storage.version,
});
