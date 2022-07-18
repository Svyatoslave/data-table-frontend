import { useQuery, type UseQueryReturnType } from "vue-query";

import type {
  FiltersPayload,
  PaginatedDto,
  PaginationPayload,
  SortPayload,
} from "@/lib/api";
import type { ApplicationForm } from "@/features/application-forms";
import { getSummonApplicationForms } from "@/features/summons";

export interface UseSummonApplicationFormsOptions {
  summonID: string;
  pagination: PaginationPayload;
  sort: SortPayload;
  filters: FiltersPayload;
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
        page: options.pagination.page,
        sort: options.sort,
        filters: options.filters,
      },
    ],
    queryFn: () =>
      getSummonApplicationForms({
        summonID: options.summonID,
        pagination: options.pagination,
        sort: options.sort,
        filters: options.filters,
      }),
    onSuccess: options.onSuccess,
  });
