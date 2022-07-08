import { onUnmounted, ref, type Ref } from "vue";
import { createInjectionState } from "@vueuse/core";

import { identity } from "@/shared/utils/fp";
import type { Optional } from "@/shared/types/utility";
export interface PrimitiveFilter {
  type: "primitive";
  value: string;
}

export type TypeSearch =
  | "contain"
  | "notContain"
  | "equal"
  | "notEqual"
  | "startWith"
  | "endWith";

export type ComparisonAndOr = 0 | 1;

export interface CommonFilter {
  type: "common";
  firstSearchField: {
    typeSearch: TypeSearch;
    searchText?: string;
  };
  comparisonAndOr: ComparisonAndOr;
  secondSearchField: {
    typeSearch: TypeSearch;
    searchText?: string;
  };
}

export interface MultiSelectFilter {
  type: "multi-select";
  values: (string | number)[];
}

export type Filter = PrimitiveFilter | CommonFilter | MultiSelectFilter;

export type Filters = Record<string, Filter>;

export interface UseFilterableReturn {
  filters: Ref<Filters>;
  getFilter: <T extends Filter>(filterField: string) => Optional<T>;
  changeFilter: (filterField: string, filter: Filter) => void;
  deleteFilter: (filterField: string) => void;
}

export const useFilterable = (): UseFilterableReturn => {
  const filters = ref<Filters>({});

  const getFilter = <T extends Filter>(filterField: string): Optional<T> =>
    filters.value[filterField] as Optional<T>;

  const changeFilter = (filterField: string, filter: Filter) => {
    filters.value[filterField] = filter;
  };

  const deleteFilter = (filterField: string) => {
    delete filters.value[filterField];
  };

  onUnmounted(() => {
    filters.value = {};
  });

  return { filters, getFilter, changeFilter, deleteFilter };
};

export const [useProvideFilterable, useFilterableCtx] = createInjectionState<
  [UseFilterableReturn],
  UseFilterableReturn
>(identity);