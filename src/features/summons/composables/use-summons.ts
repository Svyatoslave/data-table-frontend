import type { Ref } from "vue";
import { type UseQueryReturnType, useQuery } from "vue-query";

import type { FiltersPayload, PaginatedDto, SortPayload } from "@/lib/api";
import { type Summon, getSummons } from "@/features/summons";

interface UseSummonsOptions {
  keepPreviousData: boolean;
  page: Ref<number>;
  filters: Ref<FiltersPayload>;
  sort: SortPayload;
  onSuccess?: (data: PaginatedDto<Summon>) => void;
}

export const useSummons = (
  options: UseSummonsOptions
): UseQueryReturnType<PaginatedDto<Summon>, unknown> =>
  useQuery({
    queryKey: [
      "summons",
      {
        page: options.page,
        sort: options.sort,
        filters: options.filters,
      },
    ],
    queryFn: () =>
      getSummons({
        pagination: { page: options.page.value },
        sort: options.sort,
        filters: options.filters.value,
      }),
    keepPreviousData: options.keepPreviousData,
    onSuccess: options.onSuccess,
  });
