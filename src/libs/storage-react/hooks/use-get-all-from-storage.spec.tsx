import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { type FC, type PropsWithChildren } from "react";
import { cleanup, render } from "@testing-library/react";
import { byRole } from "testing-library-selector";
import { createStorage, drivers, type Storage } from "@libs/storage";
import { useGetAllFromStorage } from "./use-get-all-from-storage";
import { StorageProvider } from "../components";
import { string, array, object } from "superstruct";
import { waitFor } from "@testing-library/dom";
import { StorageReactException } from "../storage-react.exception";

describe("useGetAllFromStorage()", () => {
  let storage: Storage;

  const ui = {
    valueInput: (id: string) => byRole("textbox", { name: `value-${id}` }),
    errorTypeInput: byRole("textbox", { name: "type" }),
    errorMessageInput: byRole("textbox", { name: "message" }),
    loadingIndicator: byRole("progressbar"),
  };

  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <StorageProvider storage={storage}>{children}</StorageProvider>
  );

  const TestComponent: FC = () => {
    const { values, isFetching, error } = useGetAllFromStorage(
      array(object({ id: string(), name: string() })),
    );

    if (isFetching) {
      return <div role="progressbar">loading...</div>;
    }

    return (
      <div>
        {values.map(({ id, name }) => (
          <label>
            {`value-${id}`}
            <input type="text" name={`value-${id}`} value={name} readOnly />
          </label>
        ))}
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

  test("should get all values stored in storage", async () => {
    await storage.setItem("key", { id: "1", name: "John" });
    await storage.setItem("key", { id: "2", name: "Jane" });

    render(<TestComponent />, { wrapper: Wrapper });

    // loading until all storage promises are resolved
    expect(ui.loadingIndicator.get()).toBeInTheDocument();

    await waitFor(() =>
      expect(ui.loadingIndicator.query()).not.toBeInTheDocument(),
    );

    expect(ui.valueInput("1").get()).toHaveValue("John");
    expect(ui.valueInput("2").get()).toHaveValue("Jane");
  });

  // test("should return validation error when schema is not satisfied", async () => {
  //   await storage.setItem("key", 120);
  //
  //   render(<TestComponent />, { wrapper: Wrapper });
  //
  //   await waitFor(() =>
  //     expect(ui.loadingIndicator.query()).not.toBeInTheDocument(),
  //   );
  //
  //   expect(ui.errorTypeInput.get()).toHaveValue("StructError");
  // });
  //
  // test("should leave value undefined when storage has nothing and provide and error to explain why", async () => {
  //   render(<TestComponent />, { wrapper: Wrapper });
  //
  //   await waitFor(() =>
  //     expect(ui.loadingIndicator.query()).not.toBeInTheDocument(),
  //   );
  //
  //   expect(ui.errorTypeInput.get()).toHaveValue(StorageReactException.name);
  //   expect(ui.errorMessageInput.get()).toHaveValue(
  //     StorageReactException.noValueFoundInStorage("key").message,
  //   );
  // });
});
