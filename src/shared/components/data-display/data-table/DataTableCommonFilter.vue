<template>
  <form>
    <NSelect
      v-model:value="firstTypeSearch"
      :options="typeSearchOptions"
      class="tcf__field"
    />
    <NInput
      v-model:value="firstSearchText"
      placeholder=""
      :input-props="{ name: 'login' }"
      class="tcf__field"
    />
    <NSelect
      v-model:value="comparisonAndOr"
      :options="comparisonAndOrOptions"
      class="tcf__field"
    />
    <NSelect
      v-model:value="secondTypeSearch"
      :options="typeSearchOptions"
      class="tcf__field"
    />
    <NInput
      v-model:value="secondSearchText"
      placeholder=""
      :input-props="{ name: 'login' }"
      class="tcf__field"
    />
    <div class="tcf__actions">
      <VButton size="m" variant="text" color="primary" @click="handleReset">
        Сбросить
      </VButton>
      <VButton
        :disabled="!nonErrors"
        size="m"
        variant="contained"
        color="success"
        @click="handleApply"
      >
        Применить
      </VButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NInput, NSelect } from "naive-ui";
import { useField, useForm } from "vee-validate";
import { mixed, object, string, type InferType } from "yup";

import { isNonNullable } from "@/shared/utils/equal";
import { VButton } from "@/shared/components/inputs";
import {
  useFilterableCtx,
  type CommonFilter,
  type TypeSearch,
  type ComparisonAndOr,
  type CommonColumnFilterOptions,
} from "@/shared/components/data-display";
import { getValuesFromSelect } from "@/shared/utils/select";
import type { SelectOptions } from "@/shared/types/select";

const typeSearchOptions = [
  {
    label: "Содержит",
    value: "contain",
  },
  {
    label: "Не содержит",
    value: "notContain",
  },
  {
    label: "Равно",
    value: "equal",
  },
  {
    label: "Не равно",
    value: "notEqual",
  },
  {
    label: "Начинается с",
    value: "startWith",
  },
  {
    label: "Заканчивается с",
    value: "endWith",
  },
];

const comparisonAndOrOptions = [
  {
    label: "И",
    value: 1,
  },
  {
    label: "ИЛИ",
    value: 0,
  },
];

const schema = object({
  firstTypeSearch: mixed<TypeSearch>()
    .oneOf(
      getValuesFromSelect<TypeSearch>(
        typeSearchOptions as SelectOptions<TypeSearch>
      )
    )
    .required("Это обязательное поле"),
  firstSearchText: string(),
  comparisonAndOr: mixed<ComparisonAndOr>()
    .oneOf(
      getValuesFromSelect<ComparisonAndOr>(
        comparisonAndOrOptions as SelectOptions<ComparisonAndOr>
      )
    )
    .required("Это обязательное поле"),
  secondTypeSearch: mixed<TypeSearch>()
    .oneOf(
      getValuesFromSelect<TypeSearch>(
        typeSearchOptions as SelectOptions<TypeSearch>
      )
    )
    .required("Это обязательное поле"),
  secondSearchText: string(),
});

type CommonFilterValues = InferType<typeof schema>;

const props = defineProps<{
  filterOptions: CommonColumnFilterOptions;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const mapToCommonFilter = (values: CommonFilterValues): CommonFilter => ({
  type: "common",
  firstSearchField: {
    typeSearch: values.firstTypeSearch,
    searchText: values.firstSearchText,
  },
  comparisonAndOr: values.comparisonAndOr,
  secondSearchField: {
    typeSearch: values.secondTypeSearch,
    searchText: values.secondSearchText,
  },
});

const mapToValues = (filter: CommonFilter): CommonFilterValues => ({
  firstTypeSearch: filter.firstSearchField.typeSearch,
  firstSearchText: filter.firstSearchField.searchText || "",
  comparisonAndOr: filter.comparisonAndOr,
  secondTypeSearch: filter.secondSearchField.typeSearch,
  secondSearchText: filter.secondSearchField.searchText || "",
});

const filterable = useFilterableCtx();

const defaultValues: CommonFilterValues = {
  firstTypeSearch: "contain",
  firstSearchText: "",
  comparisonAndOr: 1,
  secondTypeSearch: "contain",
  secondSearchText: "",
};

const getInitialValues = (): CommonFilterValues => {
  if (!isNonNullable(filterable)) {
    return defaultValues;
  }

  const exist = filterable.getFilter<CommonFilter>(
    props.filterOptions.filterField
  );
  if (!isNonNullable(exist)) {
    return defaultValues;
  }

  return mapToValues(exist);
};

const { handleSubmit } = useForm<CommonFilterValues>({
  validationSchema: schema,
  initialValues: getInitialValues(),
  validateOnMount: true,
});

const { value: firstTypeSearch } = useField<string>("firstTypeSearch");
const { value: firstSearchText } = useField<string>("firstSearchText");
const { value: comparisonAndOr } = useField<string>("comparisonAndOr");
const { value: secondTypeSearch } = useField<string>("secondTypeSearch");
const { value: secondSearchText } = useField<string>("secondSearchText");

const nonErrors = computed(
  () => firstSearchText.value.length > 0 || secondSearchText.value.length > 0
);

const handleApply = handleSubmit((values: CommonFilterValues) => {
  if (isNonNullable(filterable)) {
    filterable.changeFilter(
      props.filterOptions.filterField,
      mapToCommonFilter(values)
    );
    emit("close");
  }
});

const handleReset = () => {
  if (isNonNullable(filterable)) {
    filterable.deleteFilter(props.filterOptions.filterField);
    emit("close");
  }
};
</script>

<style scoped>
.tcf__field {
  margin-bottom: 10px;
}

.tcf__actions {
  display: flex;
  gap: 10px;
}
</style>
