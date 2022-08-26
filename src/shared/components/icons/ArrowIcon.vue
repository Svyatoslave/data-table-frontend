<template>
  <BaseIcon
    :width="size"
    :height="size"
    :class="[
      `arrow-icon--direction-${direction}`,
      `arrow-icon--color-${color}`,
    ]"
  >
    <path
      d="M8 14L12 10L8 6"
      stroke="#ffffff"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export type ArrowIconDirectionKind = "top" | "bottom" | "right" | "left";
export type ArrowIconColorKind = "white" | "grey";

export interface ArrowIconProps {
  direction?: ArrowIconDirectionKind;
  color?: ArrowIconColorKind;
  size?: number;
}

withDefaults(defineProps<ArrowIconProps>(), {
  direction: "right",
  color: "white",
  size: 20,
});
</script>

<style scoped>
.arrow-icon--direction-top {
  transform: rotate(-90deg);
}

.arrow-icon--direction-bottom {
  transform: rotate(90deg);
}

.arrow-icon--direction-left {
  transform: rotate(180deg);
}

.arrow-icon--color-white path {
  stroke: var(--white-color);
}

.arrow-icon--color-grey path {
  stroke: #c9c9d6;
}
</style>
