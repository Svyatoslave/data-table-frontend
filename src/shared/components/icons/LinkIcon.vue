<template>
  <BaseIcon
    :width="size"
    :height="size"
    class="link-icon"
    :class="{ [`link-icon--disabled`]: disabled }"
  >
    <path d="M5.5 3H3V16H16V13.5" stroke="#002855" />
    <path d="M10.5 3H16M16 3V8.5M16 3L8 11" stroke="#002855" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface CrossIconProps {
  disabled?: boolean;
  size?: number;
}

withDefaults(defineProps<CrossIconProps>(), {
  disabled: false,
  size: 20,
});
</script>

<style scoped>
.link-icon path {
  transition: all 0.125s;
}

.link-icon:hover {
  cursor: pointer;
}

.link-icon:hover path {
  stroke: var(--green-color);
}
.link-icon--disabled {
  pointer-events: none;
}
.link-icon--disabled:hover {
  cursor: not-allowed;
}

.link-icon--disabled path {
  stroke: var(--disabled-color);
}
</style>
