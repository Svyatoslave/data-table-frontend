import { useConfirm } from "@/lib/confirm";
import { useToast } from "@/lib/toast";
import { updateSummonCommissionMember as updateSummonCommissionMemberApi } from "@/features/summons";

export interface UseUpdateCommissionMemberModalOptions {
  onSuccess: () => void;
}

export interface UseUpdateCommissionMemberModalReturn {
  updateSummonCommissionMember: (
    summonID: string,
    commissionMemberID: string
  ) => void;
}

export const useUpdateSummonCommissionMemberModal = (
  options: UseUpdateCommissionMemberModalOptions
): UseUpdateCommissionMemberModalReturn => {
  const confirm = useConfirm();
  const toast = useToast();

  const updateSummonCommissionMember = (
    summonID: string,
    commissionMemberID: string
  ) => {
    confirm({
      inverse: true,
      title: "Подтверждение действия",
      subtitle: "Вы уверены, что хотите добавить данного члена комиссии?",
      labels: { confirm: "Да, добавить", cancel: "Нет, вернуться" },
      onConfirm: async () => {
        try {
          await updateSummonCommissionMemberApi({
            summonID: summonID,
            commissionMemberIds: [commissionMemberID],
          });
          toast({
            kind: "success",
            title: "Член комиссии успешно добавлен",
          });
          options.onSuccess();
        } catch {
          toast({ kind: "warning", title: "Ошибка при добавлении" });
        }
      },
    });
  };

  return {
    updateSummonCommissionMember,
  };
};
