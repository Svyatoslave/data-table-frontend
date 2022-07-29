<template>
  <TextInput
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
  </TextInput>
</template>

<script setup lang="ts">
import { TextInput } from "@/shared/components/inputs";
import { PasswordIcon } from "@/shared/components/icons";
import { computed, ref } from "vue";

export interface PasswordInputProps {
  readonly?: boolean;
  disabled?: boolean;
  name: string;
  placeholder: string;
  modelValue: string;
  error?: string;
}

export interface PasswordInputEmits {
  (e: "update:modelValue", value: string): void;
}

defineProps<PasswordInputProps>();

const emit = defineEmits<PasswordInputEmits>();

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
