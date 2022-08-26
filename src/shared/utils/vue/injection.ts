import { type InjectionKey, provide, inject } from "vue";

import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

export type CreateThrowInjectionComposableReturn<
  T extends unknown[],
  R
> = readonly [
  useProvidingComposable: (...args: T) => void,
  useInjectedComposable: () => R
];

export const createThrowInjectionComposable = <T extends unknown[], R>(
  composable: (...args: T) => R
): CreateThrowInjectionComposableReturn<T, R> => {
  const key: InjectionKey<R> = Symbol(`${composable.name}`);

  const useProvidingComposable = (...args: T) => {
    provide(key, composable(...args));
  };

  const useInjectedComposable = () => {
    const injection = inject(key, null);
    if (!isNonNullable(injection)) {
      throw new Error(
        `call '${composable.name}' on the appropriate parent component`
      );
    }

    return injection;
  };

  return [useProvidingComposable, useInjectedComposable];
};

export type CreateThrowInjectionStateReturn<T> = readonly [
  useProvidingState: (payload: T) => void,
  useInjectedState: () => T
];

export const createThrowInjectionState = <
  T
>(): CreateThrowInjectionStateReturn<T> => {
  const key: InjectionKey<T> = Symbol("InjectionState");

  const useProvidingState = (payload: T) => {
    provide(key, payload);
  };

  const useInjectedState = () => {
    const injection = inject(key, null);
    if (!isNonNullable(injection)) {
      throw new Error(
        `call "InjectionState" on the appropriate parent component`
      );
    }

    return injection;
  };

  return [useProvidingState, useInjectedState];
};

export type CreateNullableInjectionComposableReturn<
  T extends unknown[],
  R
> = readonly [
  useProvidingComposable: (...args: T) => void,
  useInjectedComposable: () => Nullable<R>
];

export const createNullableInjectionComposable = <T extends unknown[], R>(
  composable: (...args: T) => R
): CreateNullableInjectionComposableReturn<T, R> => {
  const key: InjectionKey<R> = Symbol(`${composable.name}`);

  const useProvidingComposable = (...args: T) => {
    provide(key, composable(...args));
  };

  const useInjectedComposable = () => inject(key, null);

  return [useProvidingComposable, useInjectedComposable];
};

export type CreateNullableInjectionStateReturn<T> = readonly [
  useProvidingState: (payload: T) => void,
  useInjectedState: () => Nullable<T>
];

export const createNullableInjectionState = <
  T
>(): CreateNullableInjectionStateReturn<T> => {
  const key: InjectionKey<T> = Symbol("InjectionState");

  const useProvidingState = (payload: T) => {
    provide(key, payload);
  };

  const useInjectedState = () => inject(key, null);

  return [useProvidingState, useInjectedState];
};
