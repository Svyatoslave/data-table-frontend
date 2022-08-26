import type { NonEmptyArray, Nullable, Optional } from "@/shared/types/utility";

export const isNonNullable = <T>(
  value: Nullable<T> | Optional<T>
): value is T => value !== null && value !== undefined;

export const isEmptyArray = <T>(arr: T[]): arr is [] => arr.length === 0;

export const isNonEmptyArray = <T>(arr: T[]): arr is NonEmptyArray<T> =>
  arr.length !== 0;

export const equalDates = (self: Date, other: Date): boolean =>
  self.getTime() === other.getTime();
