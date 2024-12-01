import { createRootRoute } from "../routing";
import { Layout } from "../components";

export const Route = createRootRoute({
  component: () => <Layout />,
});
