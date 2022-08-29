import { useQuery, type UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import type { Nullable } from "@/shared/types/utility";
import type { MaybeRef } from "@/shared/types/vue";
import type { CommissionMember } from "@/features/commission-members";
import { getSummonCommissionMembers } from "@/features/summons";

interface UseCommissionMembersOptions {
  enabled?: MaybeRef<boolean>;
  summonID: Nullable<string>;
}

export const useSummonCommissionMembers = (
  options: UseCommissionMembersOptions
): UseQueryReturnType<PaginatedDto<CommissionMember>, unknown> =>
  useQuery({
    enabled: options.enabled,
    queryKey: ["summon-commission-members", options.summonID],
    queryFn: () =>
      getSummonCommissionMembers({
        summonID: options.summonID,
      }),
  });
