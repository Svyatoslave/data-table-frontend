import { unref } from "vue";
import { useQuery, type UseQueryReturnType } from "vue-query";

import type { Nullable } from "@/shared/types/utility";
import type { MaybeRef } from "@/shared/types/vue";
import { getSummonTemplatePdf } from "@/features/summons";

interface UseSummonTemplatePdfOptions {
  summonID: string;
  summonTemplateName: MaybeRef<Nullable<string>>;
}

export const useSummonTemplatePdf = (
  options: UseSummonTemplatePdfOptions
): UseQueryReturnType<ArrayBuffer, unknown> =>
  useQuery({
    queryKey: [
      "summon-template-pdf",
      {
        summonID: options.summonID,
        summonTemplateName: options.summonTemplateName,
      },
    ],
    queryFn: () =>
      getSummonTemplatePdf({
        summonID: options.summonID,
        summonTemplateName: unref(options.summonTemplateName),
      }),
  });
