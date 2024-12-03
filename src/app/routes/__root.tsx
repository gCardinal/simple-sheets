import { Layout } from "../components";
import { createRootRoute } from "../routing";

export const Route = createRootRoute({
  component: () => <Layout />,
});
