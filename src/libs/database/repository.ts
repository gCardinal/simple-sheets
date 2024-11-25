export type Repository<O = unknown> = {
  create: (o: unknown) => Promise<string>;
  getById: (id: string) => Promise<O | undefined>;
  update: (o: O) => Promise<void>;
  delete: (id: string) => Promise<void>;
  list: () => Promise<O[]>;
};
