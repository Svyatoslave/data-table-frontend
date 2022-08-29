import { useQuery, type UseQueryReturnType } from "vue-query";

import {
  type DetailApplicationForm,
  getApplicationForm,
} from "@/features/application-forms";

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
