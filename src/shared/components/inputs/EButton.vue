<template>
  <button
    type="button"
    :class="[
      `button`,
      `button--size-${size}`,
      `button--color-${color}`,
      `button--variant-${color}-${variant}`,
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

export type VariantKind = "contained" | "outlined"| "text";

export interface ButtonProps {
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
  background: var(--blue-color);
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

.button--color-primary{
  background: var(--blue-color)
}

.button--color-primary:hover{
  background: var(--dark-blue-color) ;
}
.button--color-primary[disabled]{
  background: var(--light-blue-color);
    pointer-events: none;
}

.button--color-primary-outlined {
  border: 1px solid var(--dark-blue-color) 
}
.button--color-primary-contained {
border: 1px solid var(--blue-color);
}

.button--color-secondary{
  background: var( --sea-color);
}

.button--color-secondary:hover{
 background: var(--dark-sea-color);
}

.button--color-secondary[disabled]{
  background: var(--light-sea-color);
    pointer-events: none;
}

.button--color-secondary-outlined {
  border: 1px solid var(--dark-sea-color);
}
.button--color-secondary-contained {
border: 1px solid var( --sea-color);
}

.button--color-default{
  background: var(--white-color);
  color: #001329;
}

.button--color-default:hover{
background: var(--light-white-color);
}

.button--color-default[disabled]{
  background: var(--dark-white-color);
  color: var(--light-blue-color);
    pointer-events: none;
}

.button--color-default-outlined {
  border: 1px solid var(--blue-color);
}
.button--color-default-contained {
border: 1px solid var(--dark-white-color);
}

.button--color-error{
  background: var( --red-color);
}

.button--color-error:hover{
  background: var( --dark-red-color);
}

.button--color-error[disabled]{
background: var(--light-red-color);
  pointer-events: none;
}

.button--color-error-outlined {
  border: 1px solid var( --dark-red-color);
}
.button--color-error-contained {
border: 1px solid var( --red-color);
}

.button--color-success{
  background: var(--green-color);
}

.button--color-success:hover{
background: var(--dark-green-color);
}

.button--color-success[disabled]{
background: var(--light-green-color);
  pointer-events: none;
}

.button--color-success-outlined {
  border: 1px solid var(--dark-green-color);
}
.button--color-success-contained {
border: 1px solid var(--green-color);
}

.button-[disabled] {
  background: var(--light-sea-color);
  cursor: default;
}
</style>
