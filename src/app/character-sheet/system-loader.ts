import { createSystemLoader, type SystemLoader } from "@libs/character-sheet";
import { registrar } from "./registrar.ts";

export const systemLoader: SystemLoader = createSystemLoader(registrar);
