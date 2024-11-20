import { createSystemLoader, type SystemLoader } from "@libs/character-sheet";
import { registrations } from "./registration-map";

export const systemLoader: SystemLoader = createSystemLoader(registrations);
