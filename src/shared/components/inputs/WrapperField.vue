<template>
  <div class="wrapper-field">
    <label v-if="label" class="wrapper-field__label">
      <ETypography variant="body2">
        {{ label }}
      </ETypography>
    </label>
    <slot></slot>

    <ETypography v-if="hasError" class="wrapper-field__error" variant="body4">
      {{ error }}
    </ETypography>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ETypography } from "@/shared/components/data-display";
import { isNonNullable } from "@/shared/utils/equal";

export interface WrapperFieldProps {
  label?: string;
  error?: string;
}
const props = defineProps<WrapperFieldProps>();

const hasError = computed((): boolean => isNonNullable(props.error));
</script>

<style scoped>
.wrapper-field {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.wrapper-field__label {
  display: block;
  color: var(--blue-color);
}

.wrapper-field__error {
  color: var(--red-color);
}
</style>
