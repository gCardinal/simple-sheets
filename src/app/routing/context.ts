import type {
  Registrar,
  RendererLoader,
  SystemLoader,
} from "@libs/character-sheet";
import type { sheetRepository } from "../sheets";

export interface RouterContext {
  systemLoader: SystemLoader;
  rendererLoader: RendererLoader;
  registrar: Registrar;
  sheetRepository: typeof sheetRepository;
}
