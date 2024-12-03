import {
  type RendererLoader,
  createRendererLoader,
} from "@libs/character-sheet";
import { registrar } from "./registrar.ts";

export const rendererLoader: RendererLoader = createRendererLoader(registrar);
