import { useQuery, type UseQueryReturnType } from "vue-query";

import { getSummon, type DetailSummon } from "@/features/summons";

interface UseSummonOptions {
  summonID: string;
}

export const useSummon = (
  options: UseSummonOptions
): UseQueryReturnType<DetailSummon, unknown> =>
  useQuery({
    queryKey: ["summon", options.summonID],
    queryFn: () => getSummon({ summonID: options.summonID }),
  });