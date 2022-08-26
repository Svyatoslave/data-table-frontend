import { type UseMutationReturnType, useMutation } from "vue-query";

import {
  type ImportSummonTemplatePayload,
  importSummonTemplate,
} from "@/features/summons";

interface UseImportSummonTemplateOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useImportSummonTemplate = (
  options: UseImportSummonTemplateOptions
): UseMutationReturnType<void, unknown, ImportSummonTemplatePayload, unknown> =>
  useMutation({
    mutationFn: importSummonTemplate,
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
