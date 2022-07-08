<template>
  <BaseIcon
    :width="size"
    :height="size"
    class="loading-icon"
    :class="[`loading-icon--color-${color}`]"
  >
    <path
      opacity="0.2"
      d="M10 3.00007C6.13406 3.00007 3.00007 6.13406 3.00007 10C3.00007 13.866 6.13406 17 10 17C13.866 17 17 13.866 17 10C17 6.13406 13.866 3.00007 10 3.00007Z"
      stroke="#002855"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 3.00004C13.866 3.00004 17 6.13403 17 10"
      stroke="#002855"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 10 10"
        to="360 10 10"
        dur="0.75s"
        repeatCount="indefinite"
      />
    </path>
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export type ColorKind = "blue" | "white";

export interface LoadingIconProps {
  size?: number;
  color?: ColorKind;
}

withDefaults(defineProps<LoadingIconProps>(), {
  size: 20,
  color: "blue",
});
</script>

<style scoped>
.loading-icon--color-white path {
  stroke: var(--white-color);
}
</style>
