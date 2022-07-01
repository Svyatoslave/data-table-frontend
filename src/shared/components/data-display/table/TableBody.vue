<template>
  <LoadingOverlay :visible="loading" class="table-body__loading-overlay" />
  <table v-if="isNonNullable(rows)" class="table-body__wrapper">
    <tbody ref="tableRef" class="table-body">
      <TableBodyRow
        v-for="(row, idx) in rows"
        :key="getRowKey(row, idx)"
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
  type GetRowKeyFn,
  type TableSlotColumn,
} from "@/shared/components/data-display";
import { LoadingOverlay } from "@/shared/components/overlay";
import { createMeasurableProp } from "@/shared/utils/styles";
import type { Optional } from "@/shared/types/utility";
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
  getRowKey: GetRowKeyFn<DefaultRowData>;
}

const props = defineProps<TableBody>();

const customColumns = computed(
  () => props.columns.filter(({ type }) => type === "slot") as TableSlotColumn[]
);

const tableRef = ref(null);
const { width } = useElementSize(tableRef);
const headerFullHeightVar = useCssVar("--table-width");

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

.table-body__loading-overlay {
  position: fixed;
  margin-top: var(--header-full-height);
  margin-left: var(--sidebar-width);
  margin-bottom: var(--footer-height);
}

.table-body__wrapper {
  display: block;
  width: 100%;
}
</style>
