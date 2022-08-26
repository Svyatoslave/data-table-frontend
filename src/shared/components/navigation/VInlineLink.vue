<template>
  <a
    :href="reference"
    :class="[
      `inline-link`,
      `inline-link--color-${color}`,
      { [`inline-link--disabled`]: disabled },
      { [`inline-link--active`]: active },
    ]"
  >
    <slot name="start-icon"></slot>
    <VTypography variant="body4"><slot></slot></VTypography>
    <slot name="end-icon"></slot>
  </a>
</template>

<script setup lang="ts">
import { VTypography } from "@/shared/components/data-display";

export type VInlineLinkColorKind = "default" | "primary" | "secondary";

export interface VInlineLinkProps {
  active?: boolean;
  disabled?: boolean;
  reference: string;
  color?: VInlineLinkColorKind;
}

withDefaults(defineProps<VInlineLinkProps>(), {
  active: false,
  disabled: false,
  color: "primary",
});
</script>

<style scoped>
.inline-link--color-default {
  --default-color: var(--white-color);
  --active-color: var(--gray-color);
}

.inline-link--color-primary {
  --default-color: var(--green-color);
  --active-color: var(--dark-sea-color);
}

.inline-link--color-secondary {
  --default-color: var(--dark-sea-color);
  --active-color: var(--green-color);
}

.inline-link {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: var(--default-color);
}

.inline-link:hover,
.inline-link--active {
  color: var(--active-color);
}

.inline-link--disabled {
  color: var(--disabled-color);
  pointer-events: none;
}
</style>
