<template>
  <button type="button" class="pagination__arrow">
    <ArrowIcon :size="size" :direction="direction" />
  </button>
</template>

<script setup lang="ts">
import { ArrowIcon } from "@/shared/components/icons";

export type DirectionKind = "right" | "left";

export interface PaginationArrowProps {
  size: number;
  direction: DirectionKind;
}

defineProps<PaginationArrowProps>();
</script>

<style scoped>
.pagination__arrow {
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.125s;
  padding: 0;
}

.pagination__arrow:hover {
  background: rgba(0, 40, 85, 0.2);
}
</style>
