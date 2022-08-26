import { type Ref, ref } from "vue";

import type { ConfirmOptions, SetConfirmFn } from "@/lib/confirm";
import type { Nullable } from "@/shared/types/utility";

export interface UseConfirmStateReturn {
  confirm: Ref<Nullable<ConfirmOptions>>;
  setConfirm: SetConfirmFn;
  clearConfirm: () => void;
}

export const useConfirmState = (): UseConfirmStateReturn => {
  const confirm = ref<Nullable<ConfirmOptions>>(null);

  const setConfirm = (options: ConfirmOptions) => {
    confirm.value = options;
  };

  const clearConfirm = () => {
    confirm.value = null;
  };

  return {
    confirm,
    setConfirm,
    clearConfirm,
  };
};
