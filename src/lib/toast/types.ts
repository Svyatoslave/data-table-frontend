import type { Nullable } from "@/shared/types/utility";

export type ToastKind = "success" | "warning" | "info";

export interface CreateToastOptions {
  kind: ToastKind;
  title: string;
  description?: string;
  onClick?: () => void;
}

export interface Toast {
  key: string;
  kind: ToastKind;
  title: string;
  description?: string;
  destroyTimeoutId: Nullable<number>;
  createdAt: Date;
  destroy: () => void;
  handleTimeoutDestroy: () => void;
  onClick?: () => void;
}

export type CreateToastFn = (options: CreateToastOptions) => void;
