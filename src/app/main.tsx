import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routing";
import { ThemeProvider } from "@libs/ui";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  );
}
