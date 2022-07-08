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
  page: number;
  pageSize: number;
  total: number;
}

const props = defineProps<PaginationInfoProps>();

// 2 30 69

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
