export interface CreateIndexedDbDriverOptions extends Record<string, unknown> {
  databaseName: string;
  version?: number;
}
