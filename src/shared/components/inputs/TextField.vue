<template>
<div class="text-field">
  <label class="text-field__label" ><ETypography  variant="body4"><slot></slot></ETypography></label>
  <input
      :id="id"
      :type="type"
      :value="modelValue"
      class="text-field__input "
    />
  <div class="text-field__message"><ETypography  color="error" variant="body4">Ошибка</ETypography></div>
</div>
</template>

<script setup lang="ts">
// @input="emit('update:modelValue',value)"
import { ETypography } from "@/shared/components/data-display";

export interface TextFieldProps {
  id: string;
  label: string;
  type:string;
  modelValue: string;
 
}

defineProps<TextFieldProps>();

interface TextFieldEmits {
  (e: "update:modelValue", value: string): void;
}

const emit = defineEmits<TextFieldEmits>();

</script>
<style scoped>

    

    .text-field__label {
      display: block;
      margin-bottom: 0.25rem;
    }

    .text-field__input {
      display: block;
      width: 100%;
      height: calc(2.25rem + 2px);
      padding: 0.375rem 0.75rem;
      color: #212529;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #D2D2E2;
      border-radius: 4px;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .text-field__input::placeholder {
      color: #212529;
      opacity: 0.4;
    }

    .text-field__input:focus {
      color: #212529;
      background-color: #fff;
      border-color: #008984;
      outline: 0;
    }

    .text-field__input:disabled,
    .text-field__input[readonly] {
      background-color: #f5f5f5;
      opacity: 1;
    }

    /* is invalid */
    .text-field__input_invalid,
    .text-field__input_valid {
      border-color: #BF3F53;
      padding-right: 2.25rem;
    }

    .text-field__input_valid {
      border-color: #198754;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    }

    .text-field__input_invalid:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
    }

    .text-field__input_valid:focus {
      border-color: #198754;
      box-shadow: 0 0 0 0.25rem rgb(25 135 84 / 25%);
    }

    .text-field__message {
      display: none;
      width: 100%;
      margin-top: .25rem;
      font-size: .875rem;
      color: #dc3545;
    }

    .text-field__input_valid~.text-field__message {
      color: #198754;
    }

    .text-field__input_invalid~.text-field__message,
    .text-field__input_valid~.text-field__message {
      display: block;
    }
</style>