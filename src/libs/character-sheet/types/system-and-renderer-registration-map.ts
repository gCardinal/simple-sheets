import { type RendererRegister } from "./renderer-register.ts";
import { type SystemRegister } from "./system-register.ts";

export type SystemAndRendererRegistrationMap = [
  SystemRegister,
  RendererRegister,
][];
