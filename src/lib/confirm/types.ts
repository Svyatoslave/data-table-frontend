import type { Component } from "vue";

export interface ConfirmLabels {
  confirm?: string;
  cancel?: string;
}

export interface ConfirmOptions {
  inverse: boolean;
  title: string;
  subtitle?: string;
  slot?: Component;
  labels?: ConfirmLabels;
  onCancel?: () => Promise<void> | void;
  onConfirm: () => Promise<void> | void;
}

export type SetConfirmFn = (options: ConfirmOptions) => void;
