import type { Ref } from "vue";
import { useQuery } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import type { QueryConfig, UseQueryReturn } from "@/lib/vue-query";
import type { Nullable } from "@/shared/types/utility";
import {
  getCommissionMembers,
  type CommissionMember,
} from "@/features/commission-members";

interface UseCommissionMembersOptions {
  search: Ref<Nullable<string>>;
  queryConfig: QueryConfig<PaginatedDto<CommissionMember>>;
}

export const useCommissionMembers = (
  options: UseCommissionMembersOptions
): UseQueryReturn<PaginatedDto<CommissionMember>> =>
  useQuery({
    ...options.queryConfig,
    queryKey: ["commission-members", options.search],
    queryFn: () =>
      getCommissionMembers({
        search: options.search.value,
      }),
  });
