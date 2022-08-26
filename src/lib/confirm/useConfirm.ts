import type { SetConfirmFn } from "@/lib/confirm";
import { createThrowInjectionState } from "@/shared/utils/vue";

export const [useProvideConfirm, useConfirm] =
  createThrowInjectionState<SetConfirmFn>();
