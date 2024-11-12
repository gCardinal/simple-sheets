import { config } from "@libs/config";
import { lazy } from "react";

export const TanStackRouterDevtools = config.isProd
  ? () => null
  : lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );
