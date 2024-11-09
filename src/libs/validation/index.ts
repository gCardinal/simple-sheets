/**
 * Tiny abstraction layer for superstruct
 */
import { Struct } from "superstruct";

export { string, array, assert, object } from "superstruct";
export type Schema<T = unknown, S = unknown> = Struct<T, S>;
