<template>
  <div class="pagination">
    <PaginationButton
      :arrow="true"
      @click="emit('update:page', page - 1)"
      :disabled="isFirstPage"
    >
      <ArrowIcon :size="24" direction="left" />
    </PaginationButton>

    <div class="pagination-content">
      <PaginationButton v-if="!isFirstWindow" @click="emit('update:page', 1)">
        1
      </PaginationButton>
      <PaginationButton
        v-if="!isFirstWindow"
        @click="emit('update:page', (window - 1) * props.perPage + 1)"
      >
        ...
      </PaginationButton>
      <PaginationButton
        v-for="value in rangeWindow"
        :key="value"
        :class="{ pagination__button_active: props.page === value }"
        @click="emit('update:page', value)"
      >
        {{ value }}
      </PaginationButton>
      <PaginationButton
        v-if="!isLastWindow"
        @click="emit('update:page', (window + 1) * props.perPage + 1)"
      >
        ...
      </PaginationButton>
      <PaginationButton
        v-if="!isLastWindow"
        @click="emit('update:page', props.total)"
      >
        {{ props.total }}
      </PaginationButton>
    </div>
    <PaginationButton
      :disabled="isLastPage"
      @click="emit('update:page', page + 1)"
    >
      <ArrowIcon :size="24" direction="right" />
    </PaginationButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { PaginationButton } from "@/shared/components/data-display";
import { range } from "@/shared/utils/range";
import { ArrowIcon } from "@/shared/components/icons";

export interface EPaginationProps {
  total: number;
  page: number;
  perPage?: number;
}

interface EPaginationEmits {
  (e: "update:page", value: number): void;
}

const emit = defineEmits<EPaginationEmits>();

const props = withDefaults(defineProps<EPaginationProps>(), {
  perPage: 5,
});

const window = computed((): number =>
  props.page % props.perPage === 0
    ? Math.floor(props.page / props.perPage) - 1
    : Math.floor(props.page / props.perPage)
);
const lengthWindow = computed((): number =>
  props.total % props.perPage === 0
    ? Math.floor(props.total / props.perPage) - 1
    : Math.floor(props.total / props.perPage)
);

const startPage = computed((): number => {
  switch (true) {
    case props.page > props.perPage:
      return props.perPage * window.value + 1;
    case props.page === props.total && props.perPage < props.total:
      return props.total - props.perPage + 1;
    default:
      return 1;
  }
});
const endPage = computed(() =>
  Math.min(startPage.value + props.perPage - 1, props.total)
);

const rangeWindow = computed(() => range(startPage.value, endPage.value));

const isFirstPage = computed((): boolean => props.page === 1);
const isLastPage = computed((): boolean => props.page === props.total);

const isFirstWindow = computed((): boolean => window.value === 0);
const isLastWindow = computed(
  (): boolean => lengthWindow.value === window.value
);
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 21px;
}

.pagination-content {
  display: flex;
  align-items: center;
}
</style>
