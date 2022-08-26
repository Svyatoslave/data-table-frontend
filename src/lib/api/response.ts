import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

export interface ErrorDto {
  message: string;
}

export interface ResultDto<T> {
  data: Nullable<T>;
  err: Nullable<ErrorDto>;
}

export const unwrapResultDto = <T>(result: ResultDto<T>): T => {
  switch (true) {
    case isNonNullable(result.data):
      return result.data as T;
    case isNonNullable(result.err):
      throw new Error(
        `called "unwrapResultDto" on err message: ${
          (result.err as ErrorDto).message
        }`
      );
    default:
      throw new Error(`called "unwrapResultDto" on empty data and err`);
  }
};

export const mapResultDto = <T, R>(
  result: ResultDto<T>,
  fn: (result: T) => R
): ResultDto<R> => ({
  data: isNonNullable(result.data) ? fn(result.data) : result.data,
  err: result.err,
});

export interface PaginatedDto<T> {
  items: T[];
  total: number;
}

export const mapPaginatedDto = <T, R>(
  paginated: PaginatedDto<T>,
  fn: (result: T) => R
): PaginatedDto<R> => ({
  items: paginated.items.map(fn),
  total: paginated.total,
});
