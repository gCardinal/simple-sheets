import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { storage } from "../storage";
import { register as registerDarkenedSkies } from "@libs/system-darkened-skies/register";
import { register as registerDndLegacy } from "@libs/system-dnd-legacy/register";

export const router = createRouter({
  routeTree,
  context: {
    storage,
    registeredSystems: [registerDndLegacy(), registerDarkenedSkies()],
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
