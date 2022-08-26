import type { Ref } from "vue";
import { useQuery, type UseQueryReturnType } from "vue-query";

import type { FiltersPayload, PaginatedDto, SortPayload } from "@/lib/api";
import type { ApplicationForm } from "@/features/application-forms";
import { getSummonApplicationForms } from "@/features/summons";

export interface UseSummonApplicationFormsOptions {
  summonID: string;
  page: Ref<number>;
  filters: Ref<FiltersPayload>;
  sort: SortPayload;
  onSuccess?: (data: PaginatedDto<ApplicationForm>) => void;
}

export const useSummonApplicationForms = (
  options: UseSummonApplicationFormsOptions
): UseQueryReturnType<PaginatedDto<ApplicationForm>, unknown> =>
  useQuery({
    keepPreviousData: true,
    queryKey: [
      "summon-application-forms",
      {
        summonID: options.summonID,
        page: options.page,
        sort: options.sort,
        filters: options.filters,
      },
    ],
    queryFn: () =>
      getSummonApplicationForms({
        summonID: options.summonID,
        pagination: { page: options.page.value },
        sort: options.sort,
        filters: options.filters.value,
      }),
    onSuccess: options.onSuccess,
  });
