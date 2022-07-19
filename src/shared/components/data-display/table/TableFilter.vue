<template>
  <NPopover
    :show="showFilter"
    :show-arrow="false"
    trigger="manual"
    placement="bottom-start"
    style="width: 260px"
    @clickoutside="handleClickOutiside"
    @update:show="changeShowFilter(true)"
  >
    <template #trigger>
      <FilterIcon ref="iconRef" :active="active" @click="handleClickIcon" />
    </template>
    <TablePrimitiveFilter
      v-if="filterOptions.filterType === `primitive`"
      :filter-options="filterOptions"
      @close="changeShowFilter(false)"
    />
    <TableCommonFilter
      v-if="filterOptions.filterType === `common`"
      :filter-options="filterOptions"
      @close="changeShowFilter(false)"
    />
    <TableMultiSelectFilter
      v-if="filterOptions.filterType === `multi-select`"
      :filter-options="filterOptions"
      @close="changeShowFilter(false)"
    />
  </NPopover>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { NPopover } from "naive-ui";

import { FilterIcon } from "@/shared/components/icons";
import {
  TableCommonFilter,
  TableMultiSelectFilter,
  TablePrimitiveFilter,
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

const showFilter = ref<boolean>(false);

const filterable = useFilterableCtx();

const active = computed(
  (): boolean =>
    showFilter.value ||
    isNonNullable(filterable?.getFilter(props.filterOptions.filterField))
);

const changeShowFilter = (value: boolean) => {
  showFilter.value = value;
};

const iconRef = ref<Nullable<HTMLElement>>(null);

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

<style scoped></style>
