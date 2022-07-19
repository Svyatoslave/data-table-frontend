import type { Nullable, Optional } from "@/shared/types/utility";

export const isNonNullable = <T>(
  value: Nullable<T> | Optional<T>
): value is T => value !== null && value !== undefined;
