<template>
  <NPopover
    :show="show"
    :show-arrow="false"
    trigger="manual"
    placement="bottom"
    style="padding: 0"
    @clickoutside="handleClickOutiside"
    @update:show="handleChangeShow"
  >
    <template #trigger>
      <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="disabled"
        :name="name"
        :manualFocus="show"
        :placeholder="placeholder"
        :modelValue="formatedValue"
        :class="inputClass"
        @click="handleChangeShow(true)"
      >
        <template #end-icon><CalendarIcon :disabled="disabled" /></template>
      </VTextInput>
    </template>
    <NDatePicker
      panel
      type="datetime"
      format="dd.MM.yy HH:mm"
      :disabled="disabled"
      :value="parsedInnerValue"
      :actions="null"
      update-value-on-close
      close-on-select
      class="siv__date"
      @update:value="handleUpdateValue"
    >
      <template #footer>
        <div class="date-picker__footer">
          <VButton size="s" variant="text" @click="handleCancel">
            Отмена
          </VButton>
          <VButton size="s" color="success" @click="handleChoose">
            Выбрать
          </VButton>
        </div>
      </template>
    </NDatePicker>
  </NPopover>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { unrefElement } from "@vueuse/core";
import { NDatePicker, NPopover } from "naive-ui";

import type { Nullable } from "@/shared/types/utility";
import { VTextInput, VButton } from "@/shared/components/inputs";
import { CalendarIcon } from "@/shared/components/icons";
import { mapNullable } from "@/shared/utils/functors";
import { displayDate } from "@/shared/utils/display";

export interface VDatePickerProps {
  disabled?: boolean;
  value: Nullable<Date>;
  name: string;
  placeholder: string;
  inputClass?: string;
}

export interface VDatePickerEmits {
  (event: "update:value", value: Nullable<Date>): void;
}

const props = defineProps<VDatePickerProps>();

const emit = defineEmits<VDatePickerEmits>();

const show = ref<boolean>(false);
const innerValue = ref<Nullable<Date>>(props.value);
const inputRef = ref<Nullable<HTMLElement>>(null);

defineExpose({
  reset: () => {
    innerValue.value = props.value;
  },
});

const parsedInnerValue = computed(
  (): Nullable<number> =>
    mapNullable(innerValue.value, (value) => Date.parse(value.toString()))
);

const formatedValue = computed(() => displayDate(props.value));

const handleClickOutiside = (event: MouseEvent) => {
  const el = unrefElement(inputRef);
  const composedPath = event.composedPath();

  if (!el || el === event.target || composedPath.includes(el)) return;

  show.value = false;
};

const handleChangeShow = (value: boolean) => {
  if (!props.disabled) {
    show.value = value;
  }
};

const handleUpdateValue = (value: Nullable<number>) => {
  innerValue.value = mapNullable(value, (v) => new Date(v));
};

const handleCancel = () => {
  show.value = false;
};

const handleChoose = () => {
  show.value = false;
  emit("update:value", innerValue.value);
};
</script>

<style scoped>
.date-picker__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>

<style>
.n-date-panel--month .n-date-panel-footer {
  display: none;
}
</style>
