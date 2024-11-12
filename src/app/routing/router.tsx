import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { storage } from "../storage";

export const router = createRouter({
  routeTree,
  context: {
    storage,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
