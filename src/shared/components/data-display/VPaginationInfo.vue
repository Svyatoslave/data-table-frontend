<template>
  <div v-if="!isTotalZero" class="pagination__info">
    <VTypography variant="body10" class="pagination__info_text">
      {{ props.text }}:
    </VTypography>
    <VTypography variant="body10" class="pagination__info_text">
      c {{ firstPage }} по {{ lastPage }} из {{ props.total }}
    </VTypography>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { VTypography } from "@/shared/components/data-display";

export interface PaginationInfoProps {
  text: string;
  page: number;
  pageSize: number;
  total: number;
}

const props = defineProps<PaginationInfoProps>();

const isTotalZero = computed((): boolean => props.total === 0);

const start = computed((): number => (props.page - 1) * props.pageSize);
const end = computed((): number => props.page * props.pageSize);

const firstPage = computed((): number => start.value + 1);
const lastPage = computed((): number =>
  props.total > end.value ? props.page * props.pageSize : props.total
);
</script>

<style scoped>
.pagination__info_text {
  color: var(--white-color);
}
</style>
