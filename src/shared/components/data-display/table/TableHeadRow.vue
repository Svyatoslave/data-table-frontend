<template>
  <tr class="table-row">
    <EDivider flex-item orientation="vertical" />
    <template v-for="column in columns" :key="column.key">
      <th class="table-cell" :style="{ width: column.width }">
        <ETypography
          variant="title3"
          class="table-cell__text"
          :class="{
            [`table-cell__text--sortable`]: isSortableColumn(
              column.sortOptions
            ),
          }"
          @click="handleChangeSorting(column.sortOptions)"
        >
          {{ column.headerName }}
        </ETypography>
        <div class="table-cell__container">
          <FullArrowIcon
            v-if="isCurrentColumnSortabled(column.sortOptions)"
            :direction="directionArrow"
            @click="handleChangeSorting(column.sortOptions)"
            class="table-cell__sort-icon"
          />
          <TableFilter
            v-if="column.filterOptions.filterable"
            :filterOptions="column.filterOptions"
          />
        </div>
      </th>
      <EDivider flex-item orientation="vertical" />
    </template>
  </tr>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  EDivider,
  ETypography,
  TableFilter,
  isSortableColumn,
  useSortableCtx,
  type RowData,
  type TableColumns,
  type ColumnSortOptions,
} from "@/shared/components/data-display";
import { FullArrowIcon } from "@/shared/components/icons";
import type { Optional } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

export interface TableHeadRowProps<T extends RowData = RowData> {
  columns: TableColumns<T>;
}

defineProps<TableHeadRowProps>();

const sortable = useSortableCtx();

const isCurrentColumnSortabled = (columnSortOptions: ColumnSortOptions) =>
  isSortableColumn(columnSortOptions) &&
  sortable?.isFieldSorted(columnSortOptions.sortField);

const handleChangeSorting = (columnSortOptions: ColumnSortOptions) => {
  if (isNonNullable(sortable) && isSortableColumn(columnSortOptions)) {
    sortable.changeSorting(columnSortOptions.sortField);
  }
};

type DirectionArrow = "top" | "bottom";

// eslint-disable-next-line vue/return-in-computed-property
const directionArrow = computed((): Optional<DirectionArrow> => {
  if (!isNonNullable(sortable)) return;

  switch (sortable.sort.order) {
    case "asc":
      return "top";
    case "decs":
      return "bottom";
    case null:
      return;
  }
});
</script>

<style scoped>
.table-row {
  display: flex;
  align-items: center;
  height: 56px;
  background-color: var(--white-color);
}

.table-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 5px;
  padding: 0 20px;
  box-sizing: border-box;
}

.table-cell__text {
  box-sizing: border-box;
  color: var(--blue-color);
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  display: -webkit-box;
  line-height: 1;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  user-select: none;
  transition: all 0.125s;
}

.table-cell__text--sortable:hover {
  cursor: pointer;
  color: var(--green-color);
}

.table-cell__sort-icon:hover {
  cursor: pointer;
}

.table-cell__container {
  display: flex;
  gap: 5px;
}
</style>
