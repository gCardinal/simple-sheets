import { type System } from "./system";

export interface SystemRegistration
  extends Pick<System, "slug" | "name" | "version"> {
  loadSystem: () => Promise<System>;
}
