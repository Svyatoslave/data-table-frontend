import { type Ref, ref, onUnmounted } from "vue";

import type { Optional } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import { createNullableInjectionState } from "@/shared/utils/vue";

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
  type: "multiSelect";
  values: (string | number)[];
}

export interface DateRangeFilter {
  type: "dateRange";
  to: Date;
  from: Date;
}

export type Filter =
  | PrimitiveFilter
  | CommonFilter
  | MultiSelectFilter
  | DateRangeFilter;

export type Filters = Record<string, Filter>;

export interface UseFilterableOptions {
  initialFilters?: Filters;
  onChange?: (filters: Filters) => void;
}

export interface UseFilterableReturn {
  filters: Ref<Filters>;
  getFilter: <T extends Filter>(filterField: string) => Optional<T>;
  changeFilter: (filterField: string, filter: Filter) => void;
  deleteFilter: (filterField: string) => void;
}

export const useFilterable = (
  options: UseFilterableOptions = {}
): UseFilterableReturn => {
  const filters = ref<Filters>(
    isNonNullable(options.initialFilters) ? options.initialFilters : {}
  );

  const getFilter = <T extends Filter>(filterField: string): Optional<T> =>
    filters.value[filterField] as Optional<T>;

  const changeFilter = (filterField: string, filter: Filter) => {
    filters.value[filterField] = filter;

    if (isNonNullable(options.onChange)) {
      options.onChange(filters.value);
    }
  };

  const deleteFilter = (filterField: string) => {
    delete filters.value[filterField];

    if (isNonNullable(options.onChange)) {
      options.onChange(filters.value);
    }
  };

  onUnmounted(() => {
    filters.value = {};
  });

  return { filters, getFilter, changeFilter, deleteFilter };
};

export const [useProvideFilterable, useFilterableCtx] =
  createNullableInjectionState<UseFilterableReturn>();
