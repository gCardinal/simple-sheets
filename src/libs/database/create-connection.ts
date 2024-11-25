import Dexie, { type EntityTable } from "dexie";

export interface ConnectionOptions<S> {
  version: number;
  databaseName: string;
  tables: Array<{
    name: keyof S & string;
    primaryKey: string;
    autoIncrementPrimaryKey: boolean;
  }>;
}

export const createConnection = <S = Record<string, EntityTable<never>>>(
  options: ConnectionOptions<S>,
) => {
  const db = new Dexie(options.databaseName) as Dexie & S;
  const storesSchema: Record<string, string> = {};

  for (const { primaryKey, autoIncrementPrimaryKey, name } of options.tables) {
    storesSchema[name] = `${primaryKey}${autoIncrementPrimaryKey ? "++" : ""}`;
  }

  db.version(options.version).stores(storesSchema);

  return db;
};
