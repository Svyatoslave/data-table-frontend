<template>
  <ETooltip
    :disabled="!isNonNullable(tooltip)"
    :delay="600"
    trigger="hover"
    placement="bottom-start"
  >
    <template #trigger>
      <tr class="table-row" :class="{ [`table-row--disabled`]: disabled }">
        <template v-for="(column, idx) in columns" :key="column.key">
          <td
            class="table-cell"
            :class="{ [`table-cell--disabled`]: disabled }"
            :style="{ width: column.width }"
          >
            <ETypography variant="body4">
              <TableCellTooltip
                :disabled="disabled"
                :row="row"
                :idx="idx"
                :tooltip-options="column.tooltipOptions"
              >
                <template v-if="column.type === 'standard'">
                  {{ displayNullableData(row[column.field]) }}
                </template>
                <template v-else-if="column.type === 'сomputed'">
                  {{ column.сomputed(row, idx) }}
                </template>
                <template v-else-if="column.type === 'date'">
                  {{
                    dayjs(row[column.field] as Date).format(
                      column.format || "DD.MM.YY HH:mm"
                    )
                  }}
                </template>
                <template v-else-if="column.type === 'slot'">
                  <slot
                    :name="column.slotName"
                    v-bind="{ disabled, row, idx } as TableRowCtx<any>"
                  />
                </template>
              </TableCellTooltip>
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
    <template #default>
      {{ tooltip }}
    </template>
  </ETooltip>
</template>

<script setup lang="ts">
import { dayjs } from "@/lib/day-js";
import {
  EDivider,
  ETypography,
  TableCellTooltip,
  type RowData,
  type TableColumns,
  type TableRowCtx,
} from "@/shared/components/data-display";
import { ETooltip } from "@/shared/components/overlay";
import type { Nullable } from "@/shared/types/utility";
import { displayNullableData } from "@/shared/utils/display";
import { isNonNullable } from "@/shared/utils/equal";

export interface TableBodyRowProps<T extends RowData = RowData> {
  disabled: boolean;
  tooltip: Nullable<string>;
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

.table-row--disabled {
  cursor: not-allowed;
}

.table-row--disabled:hover {
  border: 1px solid transparent;
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

.table-cell--disabled {
  color: var(--disabled-color);
}
</style>
