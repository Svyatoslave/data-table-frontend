<template>
  <table class="table-head__wrapper">
    <tbody class="table-head">
      <DataTableHeadRow :columns="columns" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import {
  DataTableHeadRow,
  type TableColumns,
} from "@/shared/components/data-display";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultRowData = any;

export interface DataTableBody {
  columns: TableColumns<DefaultRowData>;
}

defineProps<DataTableBody>();
</script>

<style scoped>
.table-head {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
}

.table-head__wrapper {
  display: block;
  width: var(--table-width);
}
</style>
