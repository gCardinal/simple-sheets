import { type RendererRegistration } from "./renderer-registration";
import { type SystemRegistration } from "./system-registration";

export type SystemAndRendererRegistrationMap = [
  SystemRegistration,
  RendererRegistration,
][];
