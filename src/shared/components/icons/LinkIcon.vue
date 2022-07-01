<template>
  <BaseIcon :width="size" :height="size">
    <path d="M5.5 3H3V16H16V13.5" stroke="#002855" />
    <path d="M10.5 3H16M16 3V8.5M16 3L8 11" stroke="#002855" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface CrossIconProps {
  size?: number;
}

withDefaults(defineProps<CrossIconProps>(), {
  size: 20,
});
</script>

<style></style>
