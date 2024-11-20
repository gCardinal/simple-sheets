import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { storage } from "../storage";
import {
  rendererLoader,
  sheetRepository,
  systemLoader,
} from "../character-sheet";

export const router = createRouter({
  routeTree,
  context: {
    storage,
    sheetRepository,
    systemLoader,
    rendererLoader,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
