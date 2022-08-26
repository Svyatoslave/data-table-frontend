<template>
  <BaseIcon :width="size" :height="size" view-box="0 0 30 30">
    <path
      d="M14.1381 5.21529L3.38648 23.493C2.99435 24.1596 3.475 25 4.24842 25H25.7516C26.525 25 27.0057 24.1596 26.6135 23.493L15.8619 5.21529C15.4753 4.55798 14.5247 4.55798 14.1381 5.21529Z"
      stroke="#002855"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <rect x="13.75" y="20" width="2.5" height="2.5" fill="#002855" />
    <rect x="13.75" y="11.25" width="2.5" height="7.5" fill="#002855" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface WarningIconProps {
  size?: number;
}

withDefaults(defineProps<WarningIconProps>(), {
  size: 20,
});
</script>
