import { createRouter } from "@tanstack/react-router";
import { registrar, rendererLoader, systemLoader } from "../character-sheet";
import { sheetRepository } from "../sheets";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  context: {
    registrar,
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
