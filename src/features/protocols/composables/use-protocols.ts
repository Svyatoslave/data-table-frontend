import { unref } from "vue";
import { useQuery, type UseQueryReturnType } from "vue-query";

import type { FiltersPayload, PaginatedDto, SortPayload } from "@/lib/api";
import type { MaybeRef } from "@/shared/types/vue";
import { getProtocols, type Protocol } from "@/features/protocols";

interface UseProtocolsOptions {
  keepPreviousData: boolean;
  page: MaybeRef<number>;
  filters: MaybeRef<FiltersPayload>;
  sort: MaybeRef<SortPayload>;
  onSuccess?: (data: PaginatedDto<Protocol>) => void;
}

export const useProtocols = (
  options: UseProtocolsOptions
): UseQueryReturnType<PaginatedDto<Protocol>, unknown> =>
  useQuery({
    keepPreviousData: options.keepPreviousData,
    queryKey: [
      "protocols",
      {
        page: options.page,
        sort: options.sort,
        filters: options.filters,
      },
    ],
    queryFn: () =>
      getProtocols({
        pagination: { page: unref(options.page) },
        sort: unref(options.sort),
        filters: unref(options.filters),
      }),
    onSuccess: options.onSuccess,
  });
