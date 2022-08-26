import { reactive, onUnmounted } from "vue";

import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import { createNullableInjectionState } from "@/shared/utils/vue";

export type SortOrder = "asc" | "decs";

interface Sort {
  field: Nullable<string>;
  order: Nullable<SortOrder>;
}

export interface UseSortableOtions {
  initialSort?: Sort;
  onChange?: (sort: Sort) => void;
}
export interface UseSortableReturn {
  sort: Sort;
  isFieldSorted: (field: string) => boolean;
  changeSorting: (field: string) => void;
}

export const useSortable = (
  options: UseSortableOtions = {}
): UseSortableReturn => {
  const sort = reactive<Sort>(
    isNonNullable(options.initialSort)
      ? options.initialSort
      : {
          field: null,
          order: null,
        }
  );

  const isFieldSorted = (field: string): boolean => field === sort.field;

  const getNextSortField = (field: string): Nullable<string> => {
    switch (sort.order) {
      case null:
      case "asc":
        return field;
      case "decs":
        return null;
    }
  };

  const getNextSortOrder = (): Nullable<SortOrder> => {
    switch (sort.order) {
      case null:
        return "asc";
      case "asc":
        return "decs";
      case "decs":
        return null;
    }
  };

  const changeSorting = (field: string) => {
    if (isFieldSorted(field)) {
      sort.field = getNextSortField(field);
      sort.order = getNextSortOrder();
    } else {
      sort.field = field;
      sort.order = "asc";
    }

    if (isNonNullable(options.onChange)) {
      options.onChange(sort);
    }
  };

  onUnmounted(() => {
    sort.field = null;
    sort.order = null;
  });

  return {
    sort,
    isFieldSorted,
    changeSorting,
  };
};

export const [useProvideSortable, useSortableCtx] =
  createNullableInjectionState<UseSortableReturn>();
