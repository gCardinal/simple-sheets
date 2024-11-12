import { validate as superstructValidate } from "superstruct";
import { type Schema } from "./schema";

export const validate = <T>(
  value: unknown,
  schema: Schema<T>,
): Error | null => {
  const [error] = superstructValidate(value, schema);

  return error || null;
};
