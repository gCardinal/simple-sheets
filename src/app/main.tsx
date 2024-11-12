import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routing";
import { StorageProvider } from "@libs/storage-react";
import { storage } from "./storage";
import { ThemeProvider } from "@libs/ui";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider>
        <StorageProvider storage={storage}>
          <RouterProvider router={router} />
        </StorageProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
