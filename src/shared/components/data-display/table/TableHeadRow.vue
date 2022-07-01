<template>
  <tr class="table-row">
    <EDivider flex-item orientation="vertical" />
    <template v-for="column in columns" :key="column.key">
      <th class="table-cell" :style="{ width: column.width }">
        <ETypography variant="title3">
          {{ column.headerName }}
        </ETypography>
      </th>
      <EDivider flex-item orientation="vertical" />
    </template>
  </tr>
</template>

<script setup lang="ts">
import {
  EDivider,
  ETypography,
  type RowData,
  type TableColumns,
} from "@/shared/components/data-display";

export interface TableHeadRowProps<T extends RowData = RowData> {
  columns: TableColumns<T>;
}

defineProps<TableHeadRowProps>();
</script>

<style scoped>
.table-row {
  display: flex;
  align-items: center;
  height: 56px;
  background-color: var(--white-color);
}

.table-cell {
  box-sizing: border-box;
  padding: 0 20px;
  color: var(--blue-color);
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  display: -webkit-box;
  line-height: 1;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
