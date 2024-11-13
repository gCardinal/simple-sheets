import type { RpgSystem } from "./rpg-system";

export interface SystemRegister {
  name: string;
  slug: string;
  version: number;
  loader: () => Promise<RpgSystem>;
}
