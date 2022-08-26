import { useQuery, type UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import type { MaybeRef } from "@/shared/types/vue";
import {
  type SummonTemplateVersion,
  getSummonTemplateVersions,
} from "@/features/summons";

interface UseSummonTemplateVersionsOptions {
  enabled: MaybeRef<boolean>;
  summonID: string;
}

export const useSummonTemplateVersions = (
  options: UseSummonTemplateVersionsOptions
): UseQueryReturnType<PaginatedDto<SummonTemplateVersion>, unknown> =>
  useQuery({
    enabled: options.enabled,
    queryKey: ["summon-template-versions", options.summonID],
    queryFn: () => getSummonTemplateVersions({ summonID: options.summonID }),
  });
