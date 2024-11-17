import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { storage } from "../storage";
import { characterSheetClient } from "../character-sheet-client.ts";

export const router = createRouter({
  routeTree,
  context: {
    storage,
    characterSheetClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
