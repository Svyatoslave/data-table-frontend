<template>
  <div>
    <ETypography variant="body4" class="pagination__info_text">
      {{ props.text }}:
    </ETypography>
    <ETypography variant="body4" class="pagination__info_text">
      c {{ firstPage }} по {{ lastPage }} из {{ props.total }}
    </ETypography>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ETypography } from "@/shared/components/data-display";

export interface PaginationInfoProps {
  text: string;
  offset: number;
  window: number;
  total: number;
}

const props = defineProps<PaginationInfoProps>();

const firstPage = computed((): number => (props.window - 1) * props.offset + 1);
const lastPage = computed((): number => props.window * props.offset);
</script>

<style scoped>
.pagination__info_text {
  color: var(--white-color);
}
</style>
