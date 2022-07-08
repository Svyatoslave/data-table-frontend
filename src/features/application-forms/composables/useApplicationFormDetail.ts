import { ref, type Ref } from "vue";

import type { Nullable } from "@/shared/types/utility";
import type { ApplicationForm } from "@/features/application-forms";

interface UseApplicationFormDetailReturn {
  detailId: Ref<Nullable<number>>;
  selectDetailId: (row: ApplicationForm) => void;
  clearDetailId: () => void;
}

export const useApplicationFormDetail = (): UseApplicationFormDetailReturn => {
  const detailId = ref<Nullable<number>>(null);

  const selectDetailId = (row: ApplicationForm) => {
    detailId.value = row.id;
  };

  const clearDetailId = () => {
    detailId.value = null;
  };

  return {
    detailId,
    selectDetailId,
    clearDetailId,
  };
};
