<template>
  <VTextInput
    :readonly="readonly"
    :disabled="disabled"
    :name="name"
    :type="type"
    :model-value="modelValue"
    :placeholder="placeholder"
    :error="error"
    @update:model-value="(value) => emit('update:modelValue', value)"
  >
    <template #end-icon>
      <PasswordIcon
        :active="showPassword"
        class="password__btn"
        @click="changeshowPassword(!showPassword)"
      />
    </template>
  </VTextInput>
</template>

<script setup lang="ts">
import { VTextInput } from "@/shared/components/inputs";
import { PasswordIcon } from "@/shared/components/icons";
import { computed, ref } from "vue";

export interface VPasswordInputProps {
  readonly?: boolean;
  disabled?: boolean;
  name: string;
  placeholder: string;
  modelValue?: string;
  error?: string;
}

export interface VPasswordInputEmits {
  (e: "update:modelValue", value: string): void;
}

defineProps<VPasswordInputProps>();

const emit = defineEmits<VPasswordInputEmits>();

const showPassword = ref<boolean>(false);

const type = computed((): string => (showPassword.value ? "text" : "password"));
const changeshowPassword = (value: boolean) => {
  showPassword.value = value;
};
</script>

<style scoped>
.password__btn {
  cursor: pointer;
}
</style>
