<template>
  <BaseIcon :width="size" :height="size" view-box="0 0 30 30">
    <rect
      x="2"
      y="2"
      width="26"
      height="26"
      rx="13"
      stroke="#002855"
      stroke-width="2"
    />
    <rect
      x="16.5"
      y="11.5"
      width="2.5"
      height="2.5"
      transform="rotate(-180 16.5 11.5)"
      fill="#002855"
    />
    <rect
      x="16.5"
      y="21.25"
      width="2.5"
      height="7.5"
      transform="rotate(-180 16.5 21.25)"
      fill="#002855"
    />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface InfoIconProps {
  size?: number;
}

withDefaults(defineProps<InfoIconProps>(), {
  size: 20,
});
</script>
