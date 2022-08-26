<template>
  <NInput v-model:value="value" class="tpf__field" />
  <div class="tpf__actions">
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
import { NInput } from "naive-ui";

import { isNonNullable } from "@/shared/utils/equal";
import { VButton } from "@/shared/components/inputs";
import {
  useFilterableCtx,
  type PrimitiveFilter,
} from "@/shared/components/data-display";
import type { PrimitiveColumnFilterOptions } from "./types";
import type { Nullable } from "@/shared/types/utility";

const props = defineProps<{
  filterOptions: PrimitiveColumnFilterOptions;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const mapToSelectFilter = (value: string): PrimitiveFilter => ({
  type: "primitive",
  value: value,
});

const filterable = useFilterableCtx();

const getInitialValue = (): Nullable<string> => {
  if (!isNonNullable(filterable)) {
    return null;
  }

  const exist = filterable.getFilter<PrimitiveFilter>(
    props.filterOptions.filterField
  );
  if (!isNonNullable(exist)) {
    return null;
  }

  return exist.value;
};

const value = ref<Nullable<string>>(getInitialValue());

const isEmptyValue = computed(
  (): boolean => !isNonNullable(value.value) || value.value.length === 0
);

const handleApply = () => {
  if (isNonNullable(filterable)) {
    filterable.changeFilter(
      props.filterOptions.filterField,
      mapToSelectFilter(value.value as string)
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
</script>

<style scoped>
.tpf__field {
  margin-bottom: 10px;
}

.tpf__actions {
  display: flex;
  gap: 10px;
}
</style>
