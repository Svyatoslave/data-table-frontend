import { type Ref, type ComputedRef, computed, ref } from "vue";

import type { CommissionMember } from "@/features/commission-members";

interface UseCommissionMembersSelectableReturn {
  selected: Ref<CommissionMember[]>;
  selectedIds: ComputedRef<string[]>;
  changeSelected: (commissionMember: CommissionMember) => void;
  deleteSelected: (commissionMember: CommissionMember) => void;
  clearSelected: () => void;
}

export const useCommissionMembersSelectable =
  (): UseCommissionMembersSelectableReturn => {
    const selected = ref<CommissionMember[]>([]);

    const selectedIds = computed<string[]>(() =>
      selected.value.map(({ id }) => id)
    );

    const deleteSelected = (commissionMember: CommissionMember) => {
      selected.value = selected.value.filter(
        ({ id }) => id !== commissionMember.id
      );
    };

    const changeSelected = (commissionMember: CommissionMember) => {
      if (selectedIds.value.includes(commissionMember.id)) {
        deleteSelected(commissionMember);
      } else {
        selected.value.push(commissionMember);
      }
    };

    const clearSelected = () => {
      selected.value = [];
    };

    return {
      selected,
      selectedIds,
      deleteSelected,
      changeSelected,
      clearSelected,
    };
  };
