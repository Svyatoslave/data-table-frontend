<template>
  <slot v-if="!hasError"></slot>
  <slot v-else name="fallback"></slot>
</template>

<script setup lang="ts">
import { computed, onErrorCaptured, ref } from "vue";

import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import { error } from "@/lib/logger";

export interface ErrorBoundaryProps {
  stopPropagation: boolean;
}

const props = defineProps<ErrorBoundaryProps>();

const err = ref<Nullable<Error>>(null);

const hasError = computed<boolean>(() => isNonNullable(err.value));

onErrorCaptured((originalError, _, info) => {
  error(
    `an error occurred: ${JSON.stringify(
      {
        name: originalError.name,
        msg: originalError.message,
        info: info,
        stack: originalError.stack,
      },
      null,
      2
    )}`
  );

  err.value = originalError;

  if (props.stopPropagation) return false;
});
</script>
