import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { type FC, type PropsWithChildren } from "react";
import { cleanup, render } from "@testing-library/react";
import { byRole } from "testing-library-selector";
import { createStorage, drivers, type Storage } from "@libs/storage";
import { useGetFromStorage } from "./use-get-from-storage";
import { StorageProvider } from "../components";
import { waitFor } from "@testing-library/dom";
import { StorageReactException } from "../storage-react.exception";

describe("useGetFromStorage()", () => {
  let storage: Storage;

  const ui = {
    valueInput: byRole("textbox", { name: "value" }),
    errorTypeInput: byRole("textbox", { name: "type" }),
    errorMessageInput: byRole("textbox", { name: "message" }),
    loadingIndicator: byRole("progressbar"),
  };

  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <StorageProvider storage={storage}>{children}</StorageProvider>
  );

  const TestComponent: FC = () => {
    const { value, isFetching, error } = useGetFromStorage("key");

    if (isFetching) {
      return <div role="progressbar">loading...</div>;
    }

    return (
      <div>
        <label>
          value
          <input type="text" name="value" value={value as string} readOnly />
        </label>
        <label>
          type
          <input type="text" name="type" value={error?.name} readOnly />
        </label>
        <label>
          message
          <input type="text" name="message" value={error?.message} readOnly />
        </label>
      </div>
    );
  };

  beforeEach(() => {
    storage = createStorage({
      driver: drivers.IN_MEMORY,
    });
  });

  afterEach(async () => {
    cleanup();
    await storage.clear();
  });

  test("should get specified value from storage", async () => {
    await storage.setItem("key", "preset-value");

    render(<TestComponent />, { wrapper: Wrapper });

    // loading until all storage promises are resolved
    expect(ui.loadingIndicator.get()).toBeInTheDocument();

    await waitFor(() =>
      expect(ui.loadingIndicator.query()).not.toBeInTheDocument(),
    );

    expect(ui.valueInput.get()).toHaveValue("preset-value");
  });

  test("should leave value undefined when storage has nothing and provide and error to explain why", async () => {
    render(<TestComponent />, { wrapper: Wrapper });

    await waitFor(() =>
      expect(ui.loadingIndicator.query()).not.toBeInTheDocument(),
    );

    expect(ui.errorTypeInput.get()).toHaveValue(StorageReactException.name);
    expect(ui.errorMessageInput.get()).toHaveValue(
      StorageReactException.noValueFoundInStorage("key").message,
    );
  });
});
