import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "./equal";

export const mapNullable = <T, R>(
  value: Nullable<T>,
  fn: (value: T) => R
): Nullable<R> => (isNonNullable(value) ? fn(value) : null);
