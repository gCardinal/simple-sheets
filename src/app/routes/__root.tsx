import { Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { createRootRoute, TanStackRouterDevtools } from "../routing";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
      </div>
      <hr />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}
