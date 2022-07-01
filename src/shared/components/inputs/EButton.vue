<template>
  <button
    type="button"
    :class="[
      `button`,
      { [`button--disabled`]: disabled },
      `button--size-${size}`,
      `button--color-${color}`,
      `button--variant-${variant}`,
    ]"
  >
    <slot name="start-icon"></slot>
    <ETypography variant="body2"><slot></slot></ETypography>
    <slot name="end-icon"></slot>
  </button>
</template>

<script setup lang="ts">
import { ETypography } from "@/shared/components/data-display";

export type SizeKind = "s" | "m" | "l";

export type ColorKind =
  | "primary"
  | "secondary"
  | "default"
  | "error"
  | "success";

export type VariantKind = "Contained" | "outlined";

export interface ButtonProps {
  disabled: boolean;
  size: SizeKind;
  color: ColorKind;
  variant: VariantKind;
}
defineProps<ButtonProps>();
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  padding: 9px 20px;
  background: var(--dark-blue-color);
  color: var(--white-color);
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.button--size-s {
  padding: 4px 12px;
}

.button--size-m {
  padding: 5px 16px;
}
.button--size-l {
  padding: 9px 20px;
}

.button--variant-Contained {
  padding: 9px 20px;
}

.button--variant-outlined {
  border: 1px solid #002855;
}

.button--disabled {
  background: #adbbc9;
  cursor: default;
}
</style>
