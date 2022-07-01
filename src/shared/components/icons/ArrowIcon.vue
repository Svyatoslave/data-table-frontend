<template>
  <BaseIcon
    :width="size"
    :height="size"
    :class="[`arrow-icon--direction-${direction}`]"
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

export type DirectionKind = "top" | "bottom" | "right" | "left";

export interface ArrowIconProps {
  direction?: DirectionKind;
  size?: number;
}

withDefaults(defineProps<ArrowIconProps>(), {
  size: 20,
  direction: "right",
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
</style>
