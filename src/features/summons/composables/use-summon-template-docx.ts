import { useQuery, type UseQueryReturnType } from "vue-query";

import type { MaybeRef } from "@/shared/types/vue";
import { getSummonTemplateDocx } from "@/features/summons";
import type { Nullable } from "@/shared/types/utility";
import { unref } from "vue";

interface UseSummonTemplateDocxOptions {
  enabled: MaybeRef<boolean>;
  summonID: string;
  summonTemplateName: MaybeRef<Nullable<string>>;
  onSuccess?: (data: ArrayBuffer) => void;
  onError?: () => void;
}

export const useSummonTemplateDocx = (
  options: UseSummonTemplateDocxOptions
): UseQueryReturnType<ArrayBuffer, unknown> =>
  useQuery({
    enabled: options.enabled,
    queryKey: [
      "summon-template-docx",
      {
        summonID: options.summonID,
        summonTemplateName: options.summonTemplateName,
      },
    ],
    queryFn: () =>
      getSummonTemplateDocx({
        summonID: options.summonID,
        summonTemplateName: unref(options.summonTemplateName),
      }),
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
