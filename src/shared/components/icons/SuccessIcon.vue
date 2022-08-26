<template>
  <BaseIcon :width="size" :height="size" view-box="0 0 30 30">
    <rect
      x="2"
      y="2"
      width="26"
      height="26"
      rx="13"
      stroke="white"
      stroke-width="2"
    />
    <path
      d="M10 15.5294L12.9412 18.7647L20 11"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface SuccessIconProps {
  size?: number;
}

withDefaults(defineProps<SuccessIconProps>(), {
  size: 20,
});
</script>
