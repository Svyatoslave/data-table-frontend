<template>
  <BaseIcon :width="size" :height="size">
    <path d="M11.5 4.5H8.5V9.5H6.5L10 13L13.5 9.5H11.5V4.5Z" stroke="#002855" />
    <path d="M4.5 13V15.5H15.5V13" stroke="#002855" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface DownloadIconProps {
  size?: number;
}

withDefaults(defineProps<DownloadIconProps>(), {
  size: 20,
});
</script>
