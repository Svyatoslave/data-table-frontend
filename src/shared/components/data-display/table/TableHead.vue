<template>
  <table class="table-head__wrapper">
    <tbody class="table-head">
      <TableHeadRow :columns="columns" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import {
  TableHeadRow,
  type TableColumns,
} from "@/shared/components/data-display";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultRowData = any;

export interface TableBody {
  columns: TableColumns<DefaultRowData>;
}

defineProps<TableBody>();
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
