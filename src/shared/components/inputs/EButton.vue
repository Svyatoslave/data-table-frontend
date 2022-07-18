<template>
  <button
    ref="buttonRef"
    type="button"
    :class="[
      `button`,
      `button--size-${size}`,
      `button--color-${color}`,
      `button--variant-${variant}`,
      { [`button--full-width`]: fullWidth },
      { [`button--loading`]: loading },
    ]"
  >
    <slot name="start-icon"></slot>
    <ETypography v-if="!loading" variant="button2"><slot></slot></ETypography>
    <div
      v-else
      class="button__loading-overlay"
      :style="{ width: prevSize.width, height: prevSize.height }"
    >
      <LoadingIcon :color="loadingColor" />
    </div>
    <slot name="end-icon"></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useElementSize } from "@vueuse/core";

import { ETypography } from "@/shared/components/data-display";
import { LoadingIcon } from "@/shared/components/icons";
import type { Nullable, Optional } from "@/shared/types/utility";
import { createMeasurableProp } from "@/shared/utils/styles";

export type TextKind = "button1" | "button2" | "button3" | "button4";

export type SizeKind = "s" | "m" | "l";

export type ColorKind =
  | "primary"
  | "secondary"
  | "default"
  | "error"
  | "success";

export type VariantKind = "text" | "outlined" | "contained";

export interface ButtonProps {
  fullWidth?: boolean;
  loading?: boolean;
  size?: SizeKind;
  color?: ColorKind;
  variant?: VariantKind;
  text?: TextKind;
}

interface PrevSize {
  width: Optional<string>;
  height: Optional<string>;
}

type loadingColorKind = "blue" | "white";

const props = withDefaults(defineProps<ButtonProps>(), {
  fullWidth: false,
  loading: false,
  size: "l",
  color: "primary",
  variant: "contained",
  text: "button2",
});

const buttonRef = ref<Nullable<HTMLElement>>(null);
const { width, height } = useElementSize(buttonRef);

const prevSize = reactive<PrevSize>({
  width: undefined,
  height: undefined,
});

watch([width, height, () => props.loading], ([width, height]) => {
  if (!props.loading) {
    prevSize.width = createMeasurableProp(width);
    prevSize.height = createMeasurableProp(height);
  }
});

const loadingColor = computed((): loadingColorKind => {
  switch (true) {
    case props.color === "primary" && props.variant === "contained":
    case props.color === "secondary" && props.variant === "contained":
    case props.color === "error" && props.variant === "contained":
    case props.color === "success" && props.variant === "contained":
      return "white";

    case props.color === "default":
    case props.color === "primary" && props.variant !== "contained":
    case props.color === "secondary" && props.variant !== "contained":
    case props.color === "error" && props.variant !== "contained":
    case props.color === "success" && props.variant !== "contained":
      return "blue";
  }
  return "white";
});
</script>

<style scoped>
.button--color-primary {
  --background-color: var(--blue-color);
  --hover-color: var(--dark-blue-color);
  --disabled-color: var(--light-blue-color);
  --text-color: var(--white-color);
  --variant-text-font-color: var(--blue-color);
  --variant-outlined-color: var(--dark-blue-color);
  --variant-outlined-font-color: var(--dark-blue-color);
}
.button--color-secondary {
  --background-color: var(--sea-color);
  --hover-color: var(--dark-sea-color);
  --disabled-color: var(--light-sea-color);
  --text-color: var(--white-color);
  --variant-text-font-color: var(--sea-color);
  --variant-outlined-color: var(--dark-sea-color);
  --variant-outlined-font-color: var(--dark-sea-color);
}

.button--color-default {
  --background-color: var(--white-color);
  --hover-color: var(--light-white-color);
  --disabled-color: var(--dark-white-color);
  --text-color: var(--black-color);
  --variant-text-font-color: var(--black-color);
  --variant-outlined-color: var(--black-color);
  --variant-outlined-font-color: var(--black-color);
}

.button--color-error {
  --background-color: var(--red-color);
  --hover-color: var(--dark-red-color);
  --disabled-color: var(--light-red-color);
  --text-color: var(--white-color);
  --variant-text-font-color: var(--red-color);
  --variant-outlined-color: var(--dark-red-color);
  --variant-outlined-font-color: var(--dark-red-color);
}

.button--color-success {
  --background-color: var(--green-color);
  --hover-color: var(--dark-green-color);
  --disabled-color: var(--light-green-color);
  --text-color: var(--white-color);
  --variant-text-font-color: var(--green-color);
  --variant-outlined-color: var(--dark-green-color);
  --variant-outlined-font-color: var(--dark-green-color);
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 20px;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--background-color);
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
}
.button:hover {
  background-color: var(--hover-color);
  border: 1px solid var(--hover-color);
}
.button:disabled {
  background-color: var(--disabled-color);
  border: 1px solid var(--disabled-color);
  cursor: not-allowed;
}
.button:disabled:hover {
  border: 1px solid var(--disabled-color);
  cursor: not-allowed;
}

.button--full-width {
  width: 100%;
}

.button--loading {
  pointer-events: none;
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

.button--variant-text {
  background-color: var(--white-color);
  border: 1px solid var(--grayish-blue-color);
  color: var(--variant-text-font-color);
}
.button--variant-text:hover {
  background-color: var(--grayish-blue-color);
  border: 1px solid var(--grayish-blue-color);
}

.button--variant-text:disabled {
  background-color: var(--white-color);
  border: 1px solid var(--grayish-blue-color);
  color: var(--disabled-color);
}
.button--variant-text:disabled:hover {
  border: 1px solid var(--grayish-blue-color);
  cursor: not-allowed;
}

.button--variant-outlined {
  background-color: var(--white-color);
  border: 1px solid var(--variant-outlined-color);
  color: var(--variant-outlined-font-color);
}

.button--variant-outlined:hover {
  border: 1px solid var(--variant-outlined-color);
  color: var(--text-color);
}
.button--variant-outlined:disabled {
  background-color: var(--white-color);
  color: var(--disabled-color);
}

.button--variant-outlined:disabled:hover {
  cursor: not-allowed;
}

.button__loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
