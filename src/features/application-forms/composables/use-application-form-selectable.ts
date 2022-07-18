import { computed, reactive, ref, type ComputedRef, type Ref } from "vue";

import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import type { ApplicationForm } from "@/features/application-forms";

interface Selectable {
  type: Nullable<string>;
  selected: ApplicationForm[];
}

interface UseApplicationFormSelectableReturn {
  selectable: Selectable;
  visibleModal: Ref<boolean>;
  nonSelected: ComputedRef<boolean>;
  isSelected: (row: ApplicationForm) => boolean;
  isNonSelectedType: (row: ApplicationForm) => boolean;
  changeVisibleModal: (value: boolean) => void;
  changeSelectable: (row: ApplicationForm) => void;
  clearSelected: () => void;
}

export const useApplicationFormSelectable =
  (): UseApplicationFormSelectableReturn => {
    const selectable = reactive<Selectable>({
      type: null,
      selected: [],
    });

    const visibleModal = ref<boolean>(false);

    const changeVisibleModal = (value: boolean) => {
      visibleModal.value = value;
    };

    const selectedIds = computed((): number[] =>
      selectable.selected.map(({ id }) => id)
    );

    const nonSelected = computed(() => selectable.selected.length === 0);

    const isSelected = (row: ApplicationForm): boolean =>
      selectedIds.value.includes(row.id);

    const isNonSelectedType = (row: ApplicationForm): boolean =>
      isNonNullable(selectable.type) &&
      selectable.type !== row.typeApplicationFormText;

    const changeSelectable = (row: ApplicationForm) => {
      if (isSelected(row)) {
        selectable.selected = selectable.selected.filter(
          ({ id }) => id !== row.id
        );

        if (nonSelected.value) {
          selectable.type = null;
        }
      } else {
        selectable.type = row.typeApplicationFormText;
        selectable.selected.push(row);
      }
    };

    const clearSelected = () => {
      selectable.selected = [];
      selectable.type = null;
    };

    return {
      selectable,
      visibleModal,
      nonSelected,
      isSelected,
      isNonSelectedType,
      changeVisibleModal,
      changeSelectable,
      clearSelected,
    };
  };
