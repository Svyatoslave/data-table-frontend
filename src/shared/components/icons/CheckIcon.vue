<template>
  <BaseIcon :width="size" :height="size" viewBox="0 0 12 9">
    <path d="M1 3.5L4.5 7L11 1" stroke="#008984" stroke-width="2" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface CheckIconProps {
  size?: number;
}

withDefaults(defineProps<CheckIconProps>(), {
  size: 12,
});
</script>
