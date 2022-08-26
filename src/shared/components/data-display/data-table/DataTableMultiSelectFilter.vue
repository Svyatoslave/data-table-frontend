<template>
  <NSelect
    v-model:value="values"
    remote
    multiple
    :show="show"
    :loading="isFetching"
    :options="(data as SelectOption[])"
    class="tsf__field"
    @update:show="handleChangeShow"
    @update:value="handleUpdate"
  />
  <div class="tsf__actions">
    <VButton size="m" variant="text" color="primary" @click="handleReset">
      Сбросить
    </VButton>
    <VButton
      :disabled="isEmptyValue"
      size="m"
      variant="contained"
      color="success"
      @click="handleApply"
    >
      Применить
    </VButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { NSelect, type SelectOption } from "naive-ui";
import { useQuery } from "vue-query";

import { isNonNullable } from "@/shared/utils/equal";
import { VButton } from "@/shared/components/inputs";
import {
  useFilterableCtx,
  type MultiSelectFilter,
} from "@/shared/components/data-display";
import type { MultiSelectColumnFilterOptions } from "./types";
import type { Nullable } from "@/shared/types/utility";

const props = defineProps<{
  filterOptions: MultiSelectColumnFilterOptions;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const mapToSelectFilter = (values: (string | number)[]): MultiSelectFilter => ({
  type: "multiSelect",
  values: values,
});

const filterable = useFilterableCtx();

const { data, isFetching } = useQuery(
  `${props.filterOptions.filterField}-select-filter`,
  props.filterOptions.getOptions
);

const getInitialValue = (): Nullable<(string | number)[]> => {
  if (!isNonNullable(filterable)) {
    return null;
  }

  const exist = filterable.getFilter<MultiSelectFilter>(
    props.filterOptions.filterField
  );
  if (!isNonNullable(exist)) {
    return null;
  }

  return exist.values;
};

const show = ref<boolean>(false);
const values = ref<Nullable<(string | number)[]>>(getInitialValue());

const isEmptyValue = computed(
  (): boolean => !isNonNullable(values.value) || values.value.length === 0
);

const handleChangeShow = (value: boolean) => {
  show.value = value;
};

const handleApply = () => {
  if (isNonNullable(filterable)) {
    filterable.changeFilter(
      props.filterOptions.filterField,
      mapToSelectFilter(values.value as (string | number)[])
    );
    emit("close");
  }
};

const handleReset = () => {
  if (isNonNullable(filterable)) {
    filterable.deleteFilter(props.filterOptions.filterField);
    emit("close");
  }
};

const handleUpdate = () => {
  show.value = false;
};
</script>

<style scoped>
.tsf__field {
  margin-bottom: 10px;
}

.tsf__actions {
  display: flex;
  gap: 10px;
}
</style>
