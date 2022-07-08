<template>
  <BaseIcon
    :width="size"
    :height="size"
    class="filter-icon"
    :class="{ [`filter-icon--active`]: active }"
  >
    <path d="M16 3H3.5L9 9V16L11 14V9L16 3Z" fill="#002855" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface FilterIconProps {
  active?: boolean;
  size?: number;
}

withDefaults(defineProps<FilterIconProps>(), {
  active: false,
  size: 20,
});
</script>

<style scoped>
.filter-icon {
  outline: none;
  transition: all 0.125s;
}

.filter-icon:hover {
  cursor: pointer;
}

.filter-icon:hover path {
  fill: var(--green-color);
}

.filter-icon--active path {
  fill: var(--green-color);
}
</style>
