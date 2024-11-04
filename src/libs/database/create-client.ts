import { Client } from "./client";
import { Driver } from "./driver.ts";

export interface CreateClientOptions {
  driver: Driver;
  version?: number;
}

export const createClient = (options: CreateClientOptions): Client => {
  return {
    connect: async () => {
      console.log("connecting to database");
    },
  };
};
