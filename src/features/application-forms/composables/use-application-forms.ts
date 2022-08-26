import type { Ref } from "vue";
import { type UseQueryReturnType, useQuery } from "vue-query";

import type { FiltersPayload, PaginatedDto, SortPayload } from "@/lib/api";
import {
  type ApplicationForm,
  getApplicationForms,
} from "@/features/application-forms";

export interface UseApplicationFormsOptions {
  keepPreviousData: boolean;
  page: Ref<number>;
  filters: Ref<FiltersPayload>;
  sort: SortPayload;
  onSuccess?: (data: PaginatedDto<ApplicationForm>) => void;
}

export const useApplicationForms = (
  options: UseApplicationFormsOptions
): UseQueryReturnType<PaginatedDto<ApplicationForm>, unknown> =>
  useQuery({
    keepPreviousData: options.keepPreviousData,
    queryKey: [
      "application-forms",
      {
        page: options.page,
        sort: options.sort,
        filters: options.filters,
      },
    ],
    queryFn: () =>
      getApplicationForms({
        pagination: { page: options.page.value },
        sort: options.sort,
        filters: options.filters.value,
      }),
    onSuccess: options.onSuccess,
  });
