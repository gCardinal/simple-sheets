import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const isTest = process.env.NODE_ENV === "test";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    isTest
      ? undefined
      : TanStackRouterVite({
          routesDirectory: "./src/app/routes",
          generatedRouteTree: "./src/app/routing/routeTree.gen.ts",
        }),
  ].filter(Boolean),
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
  },
  build: {
    outDir: "../../dist",
    sourcemap: true,
    emptyOutDir: true,
  },
});
