export interface Driver extends Record<string, unknown> {
  connect: () => Promise<void>;
}
