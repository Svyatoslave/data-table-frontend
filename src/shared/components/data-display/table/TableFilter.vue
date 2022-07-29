<template>
  <NPopover
    :show="showFilter"
    :show-arrow="false"
    trigger="manual"
    placement="bottom-start"
    :style="{
      width: filterOptions.filterType !== `dateRange` && '260px',
      padding: filterOptions.filterType === `dateRange` && 0,
    }"
    @clickoutside="handleClickOutiside"
    @update:show="changeShowFilter(true)"
  >
    <template #trigger>
      <FilterIcon
        v-if="filterOptions.filterType !== `dateRange`"
        ref="iconRef"
        :active="active"
        @click="handleClickIcon"
      />
      <CalendarIcon
        v-else
        ref="iconRef"
        hoverable
        :active="active"
        @click="handleClickIcon"
      />
    </template>
    <TablePrimitiveFilter
      v-if="filterOptions.filterType === `primitive`"
      :filter-options="filterOptions"
      @close="changeShowFilter(false)"
    />
    <TableCommonFilter
      v-else-if="filterOptions.filterType === `common`"
      :filter-options="filterOptions"
      @close="changeShowFilter(false)"
    />
    <TableMultiSelectFilter
      v-else-if="filterOptions.filterType === `multiSelect`"
      :filter-options="filterOptions"
      @close="changeShowFilter(false)"
    />
    <TableDateRangeFilter
      v-else-if="filterOptions.filterType === `dateRange`"
      :filter-options="filterOptions"
      @close="changeShowFilter(false)"
    />
  </NPopover>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { NPopover } from "naive-ui";

import { FilterIcon, CalendarIcon } from "@/shared/components/icons";
import {
  TableCommonFilter,
  TableMultiSelectFilter,
  TablePrimitiveFilter,
  TableDateRangeFilter,
  useFilterableCtx,
  type AvailableColumnFilterOptions,
} from "@/shared/components/data-display";
import { isNonNullable } from "@/shared/utils/equal";
import { unrefElement } from "@vueuse/core";
import type { Nullable } from "@/shared/types/utility";

export interface TableFilterProps {
  filterOptions: AvailableColumnFilterOptions;
}

const props = defineProps<TableFilterProps>();

const filterable = useFilterableCtx();

const showFilter = ref<boolean>(false);
const iconRef = ref<Nullable<HTMLElement>>(null);

const active = computed(
  (): boolean =>
    showFilter.value ||
    isNonNullable(filterable?.getFilter(props.filterOptions.filterField))
);

const changeShowFilter = (value: boolean) => {
  showFilter.value = value;
};

const handleClickOutiside = (event: MouseEvent) => {
  const el = unrefElement(iconRef);
  const composedPath = event.composedPath();

  if (!el || el === event.target || composedPath.includes(el)) return;

  showFilter.value = false;
};

const handleClickIcon = () => {
  showFilter.value = !showFilter.value;
};
</script>
