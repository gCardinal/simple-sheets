import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { StorageProvider } from "@libs/storage-react";
import { storage } from "./storage";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <StorageProvider storage={storage}>
        <RouterProvider router={router} />
      </StorageProvider>
    </StrictMode>,
  );
}
