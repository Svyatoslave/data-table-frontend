import { useMutation, type UseMutationReturnType } from "vue-query";

import {
  updateSummonMeetingAt,
  type UpdateSummonMeetingAtPayload,
} from "@/features/summons";

export interface UseUpdateSummonMeetingAtOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useUpdateSummonMeetingAt = (
  options: UseUpdateSummonMeetingAtOptions
): UseMutationReturnType<
  void,
  unknown,
  UpdateSummonMeetingAtPayload,
  unknown
> =>
  useMutation({
    mutationFn: updateSummonMeetingAt,
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
