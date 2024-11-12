import { createStorage } from "@libs/storage";
import { config } from "@libs/config";

export const storage = createStorage({
  driver: config.storage.driver,
  version: config.storage.version,
});
