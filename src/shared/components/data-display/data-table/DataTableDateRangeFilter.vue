<template>
  <NDatePicker
    panel
    type="datetimerange"
    :value="parsedValue"
    :actions="null"
    @update:value="handleUpdateValue"
  >
    <template #footer>
      <div class="tdrf__footer">
        <VButton size="s" variant="text" @click="handleReset">
          Сбросить
        </VButton>
        <VButton
          :disabled="isDisabledApply"
          size="s"
          color="success"
          @click="handleApply"
        >
          Применить
        </VButton>
      </div>
    </template>
  </NDatePicker>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { NDatePicker } from "naive-ui";

import { isNonNullable, equalDates } from "@/shared/utils/equal";
import type { Nullable } from "@/shared/types/utility";
import { VButton } from "@/shared/components/inputs";
import {
  useFilterableCtx,
  type DateRangeFilter,
  type DateRangeColumnFilterOptions,
} from "@/shared/components/data-display";
import { mapNullable } from "@/shared/utils/functors";

export interface TableDateRangeFilterProps {
  filterOptions: DateRangeColumnFilterOptions;
}

export interface TableDateRangeFilterEmits {
  (e: "close"): void;
}

type DateRangeValues = [Date, Date];
type DateRangeLibValues = [number, number];

const props = defineProps<TableDateRangeFilterProps>();

const emit = defineEmits<TableDateRangeFilterEmits>();

const filterable = useFilterableCtx();

const getInitialValue = (): Nullable<DateRangeValues> => {
  if (!isNonNullable(filterable)) {
    return null;
  }

  const exist = filterable.getFilter<DateRangeFilter>(
    props.filterOptions.filterField
  );
  if (!isNonNullable(exist)) {
    return null;
  }

  return [exist.from, exist.to];
};

const values = ref<Nullable<DateRangeValues>>(getInitialValue());

const parsedValue = computed<Nullable<DateRangeLibValues>>(() =>
  mapNullable(values.value, (dateValues) => [
    Date.parse(dateValues[0].toString()),
    Date.parse(dateValues[1].toString()),
  ])
);

const isDisabledApply = computed<boolean>(
  () =>
    !isNonNullable(values.value) || equalDates(values.value[0], values.value[1])
);

const mapToSelectFilter = (values: DateRangeValues): DateRangeFilter => ({
  type: "dateRange",
  from: values[0],
  to: values[1],
});

const handleUpdateValue = (newValues: Nullable<DateRangeLibValues>) => {
  values.value = mapNullable(newValues, (dateValues) => [
    new Date(dateValues[0]),
    new Date(dateValues[1]),
  ]);
};

const handleReset = () => {
  if (isNonNullable(filterable)) {
    filterable.deleteFilter(props.filterOptions.filterField);
    emit("close");
  }
};

const handleApply = () => {
  if (isNonNullable(filterable) && isNonNullable(values.value)) {
    filterable.changeFilter(
      props.filterOptions.filterField,
      mapToSelectFilter(values.value)
    );
    emit("close");
  }
};
</script>

<style scoped>
.tdrf__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
