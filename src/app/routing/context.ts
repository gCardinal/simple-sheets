import {
  type Registrar,
  type RendererLoader,
  type SystemLoader,
} from "@libs/character-sheet";
import { type sheetRepository } from "../sheets";

export interface RouterContext {
  systemLoader: SystemLoader;
  rendererLoader: RendererLoader;
  registrar: Registrar;
  sheetRepository: typeof sheetRepository;
}
