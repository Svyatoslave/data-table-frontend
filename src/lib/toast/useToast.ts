import type { CreateToastFn } from "@/lib/toast";
import { createThrowInjectionState } from "@/shared/utils/vue";

export const [useProvideToast, useToast] =
  createThrowInjectionState<CreateToastFn>();
