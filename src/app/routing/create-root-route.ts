import { createRootRouteWithContext } from "@tanstack/react-router";
import type { RouterContext } from "./context";

export const createRootRoute = createRootRouteWithContext<RouterContext>();
