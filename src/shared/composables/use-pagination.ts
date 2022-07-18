import { ref, type Ref } from "vue";

import type { Nullable } from "@/shared/types/utility";

interface UsePaginationOptions {
  initialTotal: Nullable<number>;
  initialPage: number;
  initialPageSize: number;
}

const defaultOptions: UsePaginationOptions = {
  initialTotal: null,
  initialPage: 1,
  initialPageSize: 30,
};

export interface UsePaginationReturn {
  total: Ref<Nullable<number>>;
  page: Ref<number>;
  pageSize: Ref<number>;
  resetPagination: () => void;
}

export const usePagination = (
  options: UsePaginationOptions = defaultOptions
): UsePaginationReturn => {
  const total = ref<Nullable<number>>(options.initialTotal);
  const page = ref<number>(options.initialPage);
  const pageSize = ref<number>(options.initialPageSize);

  const resetPagination = () => {
    page.value = options.initialPage;
    pageSize.value = options.initialPageSize;
  };

  return {
    total,
    page,
    pageSize,
    resetPagination,
  };
};
