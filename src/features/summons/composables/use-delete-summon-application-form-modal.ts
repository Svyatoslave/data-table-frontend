import { type Ref, type ComputedRef, computed } from "vue";

import { useConfirm } from "@/lib/confirm";
import { useToast } from "@/lib/toast";
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import { deleteSummonApplicationForm as deleteSummonApplicationFormApi } from "@/features/summons";

export interface UseDeleteSummonApplicationFormModalOptions {
  summonID: string;
  applicationFormCount: Ref<Nullable<number>>;
  onSuccess: () => void;
}

export interface UseDeleteSummonApplicationFormModalReturn {
  canDelete: ComputedRef<boolean>;
  deleteSummonApplicationForm: (applicationFormID: string) => void;
}

export const useDeleteSummonApplicationFormModal = (
  options: UseDeleteSummonApplicationFormModalOptions
): UseDeleteSummonApplicationFormModalReturn => {
  const confirm = useConfirm();
  const toast = useToast();

  const canDelete = computed<boolean>(
    () =>
      isNonNullable(options.applicationFormCount.value) &&
      options.applicationFormCount.value <= 1
  );

  const deleteSummonApplicationForm = (applicationFormID: string) => {
    confirm({
      inverse: true,
      title: "Подтверждение действия",
      subtitle: "Вы уверены, что хотите удалить данную заявку из повестки?",
      labels: { confirm: "Да, удалить", cancel: "Нет, вернуться" },
      onConfirm: async () => {
        try {
          await deleteSummonApplicationFormApi({
            summonID: options.summonID,
            applicationFormID: applicationFormID,
          });
          toast({
            kind: "success",
            title: "Заявка успешно удалена из повестки",
          });
          options.onSuccess();
        } catch {
          toast({ kind: "warning", title: "Ошибка при удалении" });
        }
      },
    });
  };

  return {
    canDelete,
    deleteSummonApplicationForm,
  };
};
