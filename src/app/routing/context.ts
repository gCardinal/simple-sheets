import type { Storage } from "@libs/storage";
import {
  type RendererLoader,
  type SheetRepository,
  type SystemLoader,
} from "@libs/character-sheet";

export interface RouterContext {
  storage: Storage;
  sheetRepository: SheetRepository;
  systemLoader: SystemLoader;
  rendererLoader: RendererLoader;
}
