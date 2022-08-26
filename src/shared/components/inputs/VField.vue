<template>
  <div class="wrapper-field">
    <label v-if="label" class="wrapper-field__label">
      <VTypography variant="body2">
        {{ label }}
      </VTypography>
    </label>
    <slot></slot>

    <VTypography v-if="hasError" class="wrapper-field__error" variant="body4">
      {{ error }}
    </VTypography>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { VTypography } from "@/shared/components/data-display";
import { isNonNullable } from "@/shared/utils/equal";

export interface VFieldProps {
  label?: string;
  error?: string;
}
const props = defineProps<VFieldProps>();

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
