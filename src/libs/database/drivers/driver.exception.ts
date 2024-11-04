export class DriverException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  public static failedToOpenConnection(
    options: Record<string, unknown>,
    originalError: unknown,
  ): DriverException {
    return new DriverException(
      `Failed to open database connection with options provided (${JSON.stringify(options)}). Error received was ${originalError}.`,
    );
  }
}
