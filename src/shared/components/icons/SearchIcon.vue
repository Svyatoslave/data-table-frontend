<template>
  <BaseIcon :width="size" :height="size" class="search-icon">
    <circle cx="9.5" cy="8.5" r="5.5" stroke="#001329" />
    <path d="M14 13L16.5 15.5" stroke="#001329" stroke-linecap="square" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface SearchIconProps {
  active?: boolean;
  size?: number;
}

withDefaults(defineProps<SearchIconProps>(), {
  active: false,
  size: 20,
});
</script>

<style scoped>
.search-icon {
  outline: none;
}
</style>
