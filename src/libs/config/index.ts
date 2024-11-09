import { drivers } from "@libs/storage";

export const config = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  storage: {
    driver: drivers.INDEXEDDB,
    version: 1,
  },
};
