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
}
