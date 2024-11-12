export class StorageReactException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  public static noContext(): StorageReactException {
    return new StorageReactException(
      "No context found. Did you forget to wrap your component in a <StorageProvider>?",
    );
  }

  public static noValueFoundInStorage(key: string): StorageReactException {
    return new StorageReactException(
      `No value found in storage for key "${key}".`,
    );
  }

  public static unknownError(error?: unknown): StorageReactException {
    return new StorageReactException(
      `Unknown error${error ? " " + JSON.stringify(error) : ""}.`,
    );
  }
}
