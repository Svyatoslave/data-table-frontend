<template>
  <BaseIcon :width="size" :height="size">
    <path
      d="M3 17H12.5V16H3V17ZM12.5 6H3V7H12.5V6ZM18 11.5C18 8.46243 15.5376 6 12.5 6V7C14.9853 7 17 9.01472 17 11.5H18ZM12.5 17C15.5376 17 18 14.5376 18 11.5H17C17 13.9853 14.9853 16 12.5 16V17Z"
      fill="#002855"
      :class="lineClass"
    />
    <path d="M6 3L3 6.5L6 10" stroke="#002855" :class="arrowClass" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface BackIconProps {
  size?: number;
  arrowClass?: string;
  lineClass?: string;
}

withDefaults(defineProps<BackIconProps>(), {
  size: 20,
});
</script>

<style scoped></style>
