<template>
  <button :disabled="disabled" type="button" class="pagination-arrow">
    <ArrowIcon :size="size" :direction="direction" :color="arrowColor" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ArrowIcon } from "@/shared/components/icons";

export type PaginationArrowDirectionKind = "right" | "left";

export interface PaginationArrowProps {
  disabled: boolean;
  size: number;
  direction: PaginationArrowDirectionKind;
}

const props = defineProps<PaginationArrowProps>();

const arrowColor = computed(() => {
  switch (props.disabled) {
    case true:
      return "grey";
    case false:
    default:
      return "white";
  }
});
</script>

<style scoped>
.pagination-arrow {
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.125s;
  padding: 0;
}

.pagination-arrow:hover {
  background: rgba(0, 40, 85, 0.2);
}

.pagination-arrow:disabled,
.pagination-arrow:disabled:hover {
  background-color: transparent;
  cursor: not-allowed;
}
</style>
