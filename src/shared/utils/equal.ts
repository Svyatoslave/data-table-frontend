import type { Nullable, Optional } from "@/shared/types/utility";

export const isNonNullable = <T>(
  value: Nullable<T> | Optional<T>
): value is T => value !== null && value !== undefined;

export const equalDates = (self: Date, other: Date): boolean =>
  self.getTime() === other.getTime();
