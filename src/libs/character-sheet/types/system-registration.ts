import { type System } from "../models";

/**
 * Simple object containing the information required to load a system. This allows
 * for lazy loading of the whole system when they are needed.
 */
export interface SystemRegistration
  extends Pick<System, "slug" | "name" | "version" | "shortName"> {
  loadSystem: () => Promise<System>;
}
