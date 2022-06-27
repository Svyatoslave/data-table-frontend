<template>
  <div class="pagination">
    <button
      @click="emit('update:page', page - 1)"
      :disabled="isFirstPage"
      class="pagination__arrow"
    >
      <ArrowIcon :size="24" direction="left" />
    </button>
    <div class="pagination-content">
      <button
        v-if="!isFirstWindow"
        class="pagination__button"
        @click="emit('update:page', 1)"
      >
        <ETypography variant="body4" class="pagination__button_text">
          1
        </ETypography>
      </button>
      <button
        v-if="!isFirstWindow"
        class="pagination__button"
        @click="emit('update:page', (window - 1) * props.perPage + 1)"
      >
        <ETypography variant="body4" class="pagination__button_text">
          ...
        </ETypography>
      </button>
      <button
        v-for="value in rangeWindow"
        :key="value"
        class="pagination__button"
        :class="{ pagination__button_active: props.page === value }"
        @click="emit('update:page', value)"
      >
        <ETypography variant="body4" class="pagination__button_text">
          {{ value }}
        </ETypography>
      </button>
      <button
        v-if="!isLastWindow"
        class="pagination__button"
        @click="emit('update:page', (window + 1) * props.perPage + 1)"
      >
        <ETypography variant="body4" class="pagination__button_text">
          ...
        </ETypography>
      </button>
      <button
        v-if="!isLastWindow"
        class="pagination__button"
        @click="emit('update:page', props.total)"
      >
        <ETypography variant="body4" class="pagination__button_text">
          {{ props.total }}
        </ETypography>
      </button>
    </div>
    <button
      :disabled="isLastPage"
      class="pagination__arrow"
      @click="emit('update:page', page + 1)"
    >
      <ArrowIcon :size="24" direction="right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ETypography } from "@/shared/components/data-display";
import { range } from "@/shared/utils/range";
import { ArrowIcon } from "@/shared/components/icons";

import { computed } from "vue";

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
    case props.page === props.total:
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

.pagination__arrow {
  display: flex;
  align-items: center;
  color: var(--white-color);
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.pagination-content {
  display: flex;
}

.pagination__button_text {
  font-weight: 500;
}

.pagination__button {
  padding: 2px 7px;
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
  color: var(--white-color);
}

.pagination__button_active {
  background: var(--dark-blue-color);
  border: 1px solid var(--white-color);
}
</style>
