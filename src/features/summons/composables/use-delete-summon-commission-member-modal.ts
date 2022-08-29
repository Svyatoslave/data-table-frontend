import { useConfirm } from "@/lib/confirm";
import { useToast } from "@/lib/toast";
import { deleteSummonCommissionMember as deleteSummonCommissionMemberApi } from "@/features/summons";

export interface UseSummonDeleteCommissionMemberModalOptions {
  onSuccess: () => void;
}

export interface UseDeleteSummonCommissionMemberModalReturn {
  deleteSummonCommissionMember: (
    summonID: string,
    commissionMemberID: string
  ) => void;
}

export const useDeleteSummonCommissionMemberModal = (
  options: UseSummonDeleteCommissionMemberModalOptions
): UseDeleteSummonCommissionMemberModalReturn => {
  const confirm = useConfirm();
  const toast = useToast();

  const deleteSummonCommissionMember = (
    summonID: string,
    commissionMemberID: string
  ) => {
    confirm({
      inverse: true,
      title: "Подтверждение действия",
      subtitle: "Вы уверены, что хотите удалить данного члена комиссии?",
      labels: { confirm: "Да, удалить", cancel: "Нет, вернуться" },
      onConfirm: async () => {
        try {
          await deleteSummonCommissionMemberApi({
            summonID: summonID,
            commissionMemberID: commissionMemberID,
          });
          toast({
            kind: "success",
            title: "Член комиссии успешно удален",
          });
          options.onSuccess();
        } catch {
          toast({ kind: "warning", title: "Ошибка при удалении" });
        }
      },
    });
  };

  return {
    deleteSummonCommissionMember,
  };
};
