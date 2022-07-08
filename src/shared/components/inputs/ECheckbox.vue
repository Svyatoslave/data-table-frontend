<template>
  <label class="checkbox-first__label">
    <input
      :disabled="disabled"
      id="checkbox-one"
      type="checkbox"
      class="checkbox-first__input"
      @input="emit('update:checked', !checked)"
    />
    <div class="checkbox">
      <CheckIcon v-show="checked" />
    </div>
  </label>
</template>

<script setup lang="ts">
import { CheckIcon } from "@/shared/components/icons";

export interface CheckboxProps {
  disabled?: boolean;
  checked: boolean;
}

interface CheckboxEmits {
  (e: "update:checked", value: boolean): void;
}

const emit = defineEmits<CheckboxEmits>();

withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
});
</script>

<style scoped>
.checkbox-first__label {
  cursor: pointer;
  user-select: none;
}

.checkbox-first__label .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1px solid #d2d2e2;
  transition: all 0.125s;
}

.checkbox-first__label .checkbox-first__input:hover + .checkbox {
  border-color: #008984;
}

.checkbox-first__label .checkbox-first__input:disabled + .checkbox {
  border: 1px solid #d2d2e2;
  cursor: not-allowed;
}
.checkbox-first__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  z-index: -1;
}
</style>
