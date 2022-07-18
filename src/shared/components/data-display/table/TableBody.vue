<template>
  <LoadingOverlay fixed :visible="loading" />
  <table v-if="isNonNullableRows" class="table-body__wrapper">
    <tbody ref="tableRef" class="table-body">
      <TableBodyRow
        v-for="(row, idx) in rows"
        :key="getRowKey(row, idx)"
        :disabled="isDisabledRow(row, idx)"
        :tooltip="getTooltipRow(row, idx)"
        :idx="idx"
        :row="row"
        :columns="columns"
      >
        <template
          v-for="column in customColumns"
          #[column.slotName]="row: RowData"
        >
          <slot :name="column.slotName" v-bind="row"></slot>
        </template>
      </TableBodyRow>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useElementSize, useCssVar } from "@vueuse/core";

import {
  TableBodyRow,
  type TableColumns,
  type RowData,
  type TableSlotColumn,
} from "@/shared/components/data-display";
import { LoadingOverlay } from "@/shared/components/overlay";
import { createMeasurableProp } from "@/shared/utils/styles";
import type { Nullable, Optional } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import {
  documentDisabledScroll,
  documentEnabledScroll,
  documentScrollToTop,
} from "@/shared/utils/document";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultRowData = any;

export interface TableBody<T extends RowData = RowData> {
  rows: Optional<T[]>;
  loading: boolean;
  columns: TableColumns<DefaultRowData>;
  isDisabledRow?: (row: DefaultRowData, idx: number) => boolean;
  getRowKey: (row: DefaultRowData, idx: number) => string | number;
  getTooltipRow?: (row: DefaultRowData, idx: number) => Nullable<string>;
}

const props = withDefaults(defineProps<TableBody>(), {
  isDisabledRow: () => false,
  getTooltipRow: () => null,
});

const tableRef = ref(null);
const { width } = useElementSize(tableRef);
const headerFullHeightVar = useCssVar("--table-width");

const isNonNullableRows = computed((): boolean => isNonNullable(props.rows));
const customColumns = computed(
  () => props.columns.filter(({ type }) => type === "slot") as TableSlotColumn[]
);

watch(width, (currentWidth) => {
  headerFullHeightVar.value = createMeasurableProp(currentWidth);
});

watch(
  [() => props.loading, () => props.rows],
  ([currentLoading]) => {
    if (currentLoading) {
      documentDisabledScroll();
      documentScrollToTop();
    } else {
      documentEnabledScroll();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.table-body {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
}

.table-body__wrapper {
  display: block;
  width: 100%;
}
</style>
