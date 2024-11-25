import { type RendererLoader, type SystemLoader } from "@libs/character-sheet";
import { type sheetRepository } from "../sheets";

export interface RouterContext {
  systemLoader: SystemLoader;
  rendererLoader: RendererLoader;
  sheetRepository: typeof sheetRepository;
}
