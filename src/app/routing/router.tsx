import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { rendererLoader, systemLoader } from "../character-sheet";
import { sheetRepository } from "../sheets";

export const router = createRouter({
  routeTree,
  context: {
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
