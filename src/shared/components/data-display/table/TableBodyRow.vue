<template>
  <tr class="table-row">
    <template v-for="(column, idx) in columns" :key="column.key">
      <td class="table-cell" :style="{ width: column.width }">
        <ETypography variant="body2">
          <template v-if="column.type === 'standard'">
            {{ row[column.field] }}
          </template>
          <template v-if="column.type === 'сomputed'">
            {{ column.сomputed(row, idx) }}
          </template>
          <template v-if="column.type === 'date'">
            {{
              dayjs(row[column.field] as Date).format(
                column.format || "DD.MM.YY HH:ss"
              )
            }}
          </template>
          <template v-if="column.type === 'slot'">
            <slot :name="column.slotName" v-bind="row" />
          </template>
        </ETypography>
      </td>
      <EDivider
        v-if="idx !== columns.length - 1"
        flex-item
        orientation="vertical"
      />
    </template>
  </tr>
</template>

<script setup lang="ts">
import { dayjs } from "@/lib/day-js";
import {
  EDivider,
  ETypography,
  type RowData,
  type TableColumns,
} from "@/shared/components/data-display";

export interface TableBodyRowProps<T extends RowData = RowData> {
  row: T;
  idx: number;
  columns: TableColumns<T>;
}

defineProps<TableBodyRowProps>();
</script>

<style scoped>
.table-row {
  display: flex;
  align-items: center;
  height: 34px;
  padding: 6px 0;
  background-color: var(--white-color);
  box-shadow: var(--card-shadow);
  border-radius: 6px;
  border: 1px solid transparent;
  transition: all 0.125s;
}

.table-row:hover {
  border: 1px solid #5a79a6;
}

.table-cell {
  box-sizing: border-box;
  padding: 0 20px;
  color: var(--blue-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1;
}
</style>
