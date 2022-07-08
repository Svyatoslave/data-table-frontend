<template>
  <BaseIcon
    :width="size"
    :height="size"
    class="full-arrow-icon"
    :class="[`full-arrow-icon--direction-${direction}`]"
  >
    <path d="M9.5 15V8" stroke="#002855" />
    <path d="M9.5 4L5 8H14L9.5 4Z" fill="#002855" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export type DirectionKind = "top" | "bottom" | "right" | "left";

export interface ArrowIconProps {
  direction?: DirectionKind;
  size?: number;
}

withDefaults(defineProps<ArrowIconProps>(), {
  size: 20,
  direction: "top",
});
</script>

<style scoped>
.full-arrow-icon {
  transition: all 0.15s;
}

.full-arrow-icon:hover path:first-child {
  stroke: var(--green-color);
}

.full-arrow-icon:hover path:last-child {
  fill: var(--green-color);
}

.full-arrow-icon--direction-right {
  transform: rotate(-90deg);
}

.full-arrow-icon--direction-left {
  transform: rotate(90deg);
}

.full-arrow-icon--direction-bottom {
  transform: rotate(180deg);
}
</style>
