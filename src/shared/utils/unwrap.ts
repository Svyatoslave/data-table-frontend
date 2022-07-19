import type { Nullable, Optional } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

export const unwrapNullable = <T>(value: Nullable<T> | Optional<T>): T => {
  if (isNonNullable(value)) return value;

  throw new Error("unwrap nullable");
};
