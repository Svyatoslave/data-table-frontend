import type { Ref } from "vue";
import { useQuery, type UseQueryReturnType } from "vue-query";

import type { Nullable } from "@/shared/types/utility";
import type { DetailApplicationForm } from "../types/mod";
import { getApplicationForm } from "../api/get-application-form";

export interface UseApplicationFormOptions {
  applicationFormID: Ref<Nullable<string>>;
  enabled: Ref<boolean>;
}

export const useApplicationForm = (
  options: UseApplicationFormOptions
): UseQueryReturnType<DetailApplicationForm, unknown> =>
  useQuery({
    queryKey: ["application-form", options.applicationFormID],
    queryFn: () =>
      getApplicationForm({
        applicationFormID: options.applicationFormID.value as string,
      }),
    enabled: options.enabled,
  });
