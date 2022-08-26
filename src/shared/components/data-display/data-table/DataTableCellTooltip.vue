<template>
  <slot v-if="!tooltipOptions.tooltiped"></slot>
  <VTooltip
    v-else
    :disabled="disabled"
    :delay="600"
    trigger="hover"
    placement="bottom"
  >
    <template #trigger>
      <slot></slot>
    </template>
    <template #default>{{ tooltipOptions.сomputed(row, idx) }}</template>
  </VTooltip>
</template>

<script setup lang="ts">
import { VTooltip } from "@/shared/components/overlay";
import type { ColumnTooltipOptions, RowData } from "./types";

export interface TableCellTooltipProps<T extends RowData = RowData> {
  disabled: boolean;
  row: T;
  idx: number;
  tooltipOptions: ColumnTooltipOptions<T>;
}

defineProps<TableCellTooltipProps>();
</script>
