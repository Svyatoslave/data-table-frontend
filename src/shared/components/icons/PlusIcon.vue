<template>
  <BaseIcon :width="size" :height="size">
    <path
      d="M4 9.5H14"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M9 14.5L9 4.5"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
    />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface PasswordIconProps {
  size?: number;
}

withDefaults(defineProps<PasswordIconProps>(), {
  size: 20,
});
</script>
