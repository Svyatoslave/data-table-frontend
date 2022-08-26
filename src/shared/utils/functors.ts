import type { Nullable, Optional } from "@/shared/types/utility";
import { isNonNullable } from "./equal";

export const mapNullable = <T, R>(
  value: Nullable<T> | Optional<T>,
  fn: (value: T) => R
): Nullable<R> => (isNonNullable(value) ? fn(value) : null);

export const unwrapNullable = <T>(value: Nullable<T> | Optional<T>): T => {
  if (isNonNullable(value)) return value;

  throw new Error("unwrap nullable");
};

export const getOrElseNullable = <T>(
  value: Nullable<T> | Optional<T>,
  defaultValue: () => T
): T => (isNonNullable(value) ? value : defaultValue());
