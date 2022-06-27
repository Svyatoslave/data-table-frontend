<template>
  <BaseIcon :width="size" :height="size">
    <rect x="2.5" y="4.5" width="15" height="11" stroke="white" />
    <path d="M2.5 4.5L10 12L17.5 4.5" stroke="white" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface MailIconProps {
  size?: number;
}

withDefaults(defineProps<MailIconProps>(), {
  size: 20,
});
</script>
