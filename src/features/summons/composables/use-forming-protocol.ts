import { useMutation } from "vue-query";

import type { MutationConfig, UseMutationReturn } from "@/lib/vue-query";
import {
  type FormingProtocolPayload,
  formingProtocol,
} from "@/features/summons";

interface UseFormingProtocolOptions {
  mutationConfig: MutationConfig<FormingProtocolPayload, void>;
}

export const useFormingProtocol = (
  options: UseFormingProtocolOptions
): UseMutationReturn<FormingProtocolPayload, void> =>
  useMutation({
    ...options.mutationConfig,
    mutationFn: formingProtocol,
  });
