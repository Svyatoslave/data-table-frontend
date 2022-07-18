<template>
  <slot v-if="!tooltipOptions.tooltiped"></slot>
  <ETooltip
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
  </ETooltip>
</template>

<script setup lang="ts">
import { ETooltip } from "@/shared/components/overlay";
import type { ColumnTooltipOptions, RowData } from "./types";

export interface TableCellTooltipProps<T extends RowData = RowData> {
  disabled: boolean;
  row: T;
  idx: number;
  tooltipOptions: ColumnTooltipOptions<T>;
}

defineProps<TableCellTooltipProps>();
</script>
