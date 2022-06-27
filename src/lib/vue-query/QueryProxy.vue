<template>
  <slot name="loading" v-if="isLoading"></slot>
  <slot name="fetching" v-else-if="isFetching"></slot>
  <slot name="failure" v-else-if="isError" v-bind="error"></slot>
  <slot name="emptyData" v-else-if="isSuccess && data === null"></slot>
  <slot name="success" v-else v-bind="data"></slot>
</template>

<script setup lang="ts">
import type { Nullable, Optional } from "@/shared/types/utility";

export interface QueryProxyProps<T = unknown, E = unknown> {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: Optional<T>;
  error: Nullable<E>;
}

defineProps<QueryProxyProps>();
</script>
