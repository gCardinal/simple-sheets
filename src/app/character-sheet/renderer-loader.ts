import {
  createRendererLoader,
  type RendererLoader,
} from "@libs/character-sheet";
import { registrations } from "./registration-map";

export const rendererLoader: RendererLoader =
  createRendererLoader(registrations);
