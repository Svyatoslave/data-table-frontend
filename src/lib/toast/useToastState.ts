import { type ComputedRef, ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";

import type { Toast, CreateToastFn, CreateToastOptions } from "@/lib/toast";
import { isNonNullable } from "@/shared/utils/equal";

export interface useToastStateReturn {
  toasts: ComputedRef<Toast[]>;
  createToast: CreateToastFn;
}

const DURATION = 5 * 1000;

export const useToastState = (): useToastStateReturn => {
  const innerToasts = ref<Record<string, Toast>>({});

  const toasts = computed<Toast[]>(() =>
    Object.values(innerToasts.value).sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    )
  );

  const createToast = (options: CreateToastOptions) => {
    const key = uuidv4();

    const destroy = () => {
      const existDestroyTimeout = innerToasts.value[key].destroyTimeoutId;
      if (isNonNullable(existDestroyTimeout)) {
        window.clearTimeout(existDestroyTimeout);
      }

      delete innerToasts.value[key];
    };

    const handleTimeoutDestroy = () => {
      innerToasts.value[key].destroyTimeoutId = window.setTimeout(
        destroy,
        DURATION
      );
    };

    const toast: Toast = {
      key,
      kind: options.kind,
      title: options.title,
      description: options.description,
      destroyTimeoutId: null,
      createdAt: new Date(),
      destroy,
      handleTimeoutDestroy,
      onClick: options.onClick,
    };

    innerToasts.value[key] = toast;
  };

  return {
    toasts,
    createToast,
  };
};
