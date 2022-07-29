import { useQuery, type UseQueryReturnType } from "vue-query";

import type { DetailApplicationForm } from "../types/some";
import { getApplicationForm } from "../api/get-application-form";

export interface UseApplicationFormOptions {
  applicationFormID: string;
}

export const useApplicationForm = (
  options: UseApplicationFormOptions
): UseQueryReturnType<DetailApplicationForm, unknown> =>
  useQuery({
    queryKey: ["application-form", options.applicationFormID],
    queryFn: () =>
      getApplicationForm({
        applicationFormID: options.applicationFormID,
      }),
  });
