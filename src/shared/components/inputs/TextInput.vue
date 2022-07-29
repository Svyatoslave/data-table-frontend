<template>
  <div class="text-input">
    <div
      v-if="hasSlotStartIcon"
      class="text-input__start-icon"
      @click="handleClickIcon"
    >
      <slot name="start-icon"></slot>
    </div>
    <input
      :readonly="readonly"
      :disabled="disabled"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="text-input__some"
      :class="[
        {
          [`text-input__some--has-start-icon`]: hasSlotStartIcon,
          [`text-input__some--has-end-icon`]: hasSlotEndIcon,
          [`text-input__some--has-error`]: hasError,
        },
      ]"
      ref="inputRef"
      @input="handleInput"
    />
    <div
      v-if="hasSlotEndIcon"
      class="text-input__end-icon"
      @click="handleClickIcon"
    >
      <slot name="end-icon"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import { useFocus } from "@vueuse/core";

import type { Nullable } from "@/shared/types/utility";
import { hasSlotContent } from "@/shared/utils/vue";
import { isNonNullable } from "@/shared/utils/equal";

export interface TextInputProps {
  readonly?: boolean;
  disabled?: boolean;
  name: string;
  type: string;
  placeholder: string;
  modelValue: string;
  error?: string;
}

export interface TextInputEmits {
  (e: "update:modelValue", value: string): void;
}

const props = withDefaults(defineProps<TextInputProps>(), {
  readonly: false,
  disabled: false,
});

const emit = defineEmits<TextInputEmits>();

const slots = useSlots();

const hasSlotStartIcon = computed((): boolean =>
  hasSlotContent(slots["start-icon"])
);

const hasSlotEndIcon = computed((): boolean =>
  hasSlotContent(slots["end-icon"])
);

const hasError = computed((): boolean => isNonNullable(props.error));

const handleInput = (event: Event) => {
  if (event.target) {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
  }
};

const inputRef = ref<Nullable<HTMLElement>>(null);

const { focused: inputFocus } = useFocus(inputRef);

const handleClickIcon = () => {
  inputFocus.value = true;
};
</script>

<style scoped>
.text-input {
  display: block;
  position: relative;
}

.text-input__some {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 6px 12px;
  color: var(--blue-color);
  border: 1px solid #d2d2e2;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  transition: all 0.3s;
}

.text-input__some::placeholder {
  color: var(--disabled-color);
}

.text-input__some:focus {
  color: var(--blue-color);
  border-color: var(--green-color);
  outline: 0;
}

.text-input__some:disabled {
  color: #bfbfbf;
  border: 1px solid #d2d2e2;
}
.text-input__some--has-error {
  border-color: var(--red-color);
}
.text-input__some--has-start-icon {
  padding-left: 44px;
}

.text-input__start-icon {
  position: absolute;
  top: 7px;
  left: 12px;
}
.text-input__some--has-end-icon {
  padding-right: 44px;
}

.text-input__end-icon {
  position: absolute;
  top: 7px;
  right: 12px;
}
</style>
