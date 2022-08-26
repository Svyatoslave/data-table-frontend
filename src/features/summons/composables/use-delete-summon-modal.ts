import { useConfirm } from "@/lib/confirm";
import { useToast } from "@/lib/toast";
import { deleteSummon as deleteSummonApi } from "@/features/summons";

export interface UseDeleteSummonModalOptions {
  onSuccess: () => void;
}

export interface UseDeleteSummonModalReturn {
  deleteSummon: (summonID: string) => void;
}

export const useDeleteSummonModal = (
  options: UseDeleteSummonModalOptions
): UseDeleteSummonModalReturn => {
  const confirm = useConfirm();
  const toast = useToast();

  const deleteSummon = (summonID: string) => {
    confirm({
      inverse: true,
      title: "Подтверждение действия",
      subtitle: "Вы уверены, что хотите удалить данную повестку?",
      labels: { confirm: "Да, удалить", cancel: "Нет, вернуться" },
      onConfirm: async () => {
        try {
          await deleteSummonApi({ summonID: summonID });
          toast({
            kind: "success",
            title: "Повестка успешно удалена",
          });
          options.onSuccess();
        } catch {
          toast({ kind: "warning", title: "Ошибка при удалении" });
        }
      },
    });
  };

  return {
    deleteSummon,
  };
};
