import { ref, type Ref } from "vue";

import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

interface UseUpdateSummonMeetingAtModalReturn {
  meetingAt: Ref<Nullable<Date>>;
  visibleModal: Ref<boolean>;
  updateMeetingAt: (value: Nullable<Date>) => void;
}

export const useUpdateSummonMeetingAtModal =
  (): UseUpdateSummonMeetingAtModalReturn => {
    const meetingAt = ref<Nullable<Date>>(null);
    const visibleModal = ref<boolean>(false);

    const updateMeetingAt = (value: Nullable<Date>) => {
      if (!isNonNullable(value)) {
        return;
      }

      meetingAt.value = value;
      visibleModal.value = true;
    };

    return {
      meetingAt,
      visibleModal,
      updateMeetingAt,
    };
  };
