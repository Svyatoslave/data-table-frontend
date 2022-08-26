import { useMutation, type UseMutationReturnType } from "vue-query";

import {
  updateSummonCommissionMember,
  type UpdateSummonCommissionMemberPayload,
} from "@/features/summons";

export interface UseUpdateSummonCommissionMemberAtOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useUpdateSummonCommissionMember = (
  options: UseUpdateSummonCommissionMemberAtOptions
): UseMutationReturnType<
  void,
  unknown,
  UpdateSummonCommissionMemberPayload,
  unknown
> =>
  useMutation({
    mutationFn: updateSummonCommissionMember,
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
