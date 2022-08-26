/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  UseQueryOptions,
  UseQueryReturnType,
  UseMutationOptions,
  UseMutationReturnType,
} from "vue-query";

export type QueryConfig<T> = Omit<
  UseQueryOptions<T, unknown, T, any>,
  "queryKey" | "queryFn"
>;

export type UseQueryReturn<T> = UseQueryReturnType<T, unknown>;

export type MutationConfig<T, R> = Omit<
  UseMutationOptions<R, unknown, T, unknown>,
  "mutationKey" | "mutationFn"
>;

export type UseMutationReturn<T, R> = UseMutationReturnType<
  R,
  unknown,
  T,
  unknown
>;
