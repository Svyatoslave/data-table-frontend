import { onUnmounted, reactive } from "vue";
import { createInjectionState } from "@vueuse/core";

import type { Nullable } from "@/shared/types/utility";
import { identity } from "@/shared/utils/fp";

export type SortOrder = "asc" | "decs";

interface Sort {
  field: Nullable<string>;
  order: Nullable<SortOrder>;
}

export interface UseSortableOtions {
  initialSort: Sort;
}

const defaultSortableOtions: UseSortableOtions = {
  initialSort: {
    field: null,
    order: null,
  },
};

export interface UseSortableReturn {
  sort: Sort;
  isFieldSorted: (field: string) => boolean;
  changeSorting: (field: string) => void;
}

export const useSortable = (
  options: UseSortableOtions = defaultSortableOtions
): UseSortableReturn => {
  const sort = reactive<Sort>(options.initialSort);

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

export const [useProvideSortable, useSortableCtx] = createInjectionState<
  [UseSortableReturn],
  UseSortableReturn
>(identity);
