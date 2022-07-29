<template>
  <div
    ref="paginationRef"
    :class="[`pagination`, { [`pagination--absolute-center`]: absoluteCenter }]"
    :style="{ width: fixedWidth }"
  >
    <template v-if="!isTotalZero">
      <PaginationArrow
        :size="24"
        direction="left"
        @click="emit('update:page', page - 1)"
        :disabled="isFirstPage"
      />

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
          :class="{ [`pagination__button--active`]: props.page === value }"
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
      <PaginationArrow
        :size="24"
        direction="right"
        :disabled="isLastPage"
        @click="emit('update:page', page + 1)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import {
  PaginationButton,
  PaginationArrow,
} from "@/shared/components/data-display";
import { range } from "@/shared/utils/range";
import { ArrowIcon } from "@/shared/components/icons";
import type { Nullable, Optional } from "@/shared/types/utility";
import { createMeasurableProp } from "@/shared/utils/styles";
import { useElementSize } from "@vueuse/core";

export interface EPaginationProps {
  absoluteCenter?: boolean;
  total: number;
  page: number;
  pageSize: number;
  perPage?: number;
}

interface EPaginationEmits {
  (e: "update:page", value: number): void;
}

const emit = defineEmits<EPaginationEmits>();

const props = withDefaults(defineProps<EPaginationProps>(), {
  absoluteCenter: true,
  perPage: 5,
});

const isTotalZero = computed((): boolean => props.total === 0);

const length = computed((): number => Math.ceil(props.total / props.pageSize));

const window = computed((): number =>
  props.page % props.perPage === 0
    ? Math.floor(props.page / props.perPage) - 1
    : Math.floor(props.page / props.perPage)
);
const lengthWindow = computed((): number =>
  length.value % props.perPage === 0
    ? Math.floor(length.value / props.perPage) - 1
    : Math.floor(length.value / props.perPage)
);

const startPage = computed((): number => {
  switch (true) {
    case props.page > props.perPage:
      return props.perPage * window.value + 1;
    case props.page === length.value && props.perPage < length.value:
      return length.value - props.perPage + 1;
    default:
      return 1;
  }
});
const endPage = computed(() =>
  Math.min(startPage.value + props.perPage - 1, length.value)
);

const rangeWindow = computed(() => range(startPage.value, endPage.value));

const isFirstPage = computed((): boolean => props.page === 1);
const isLastPage = computed((): boolean => props.page === length.value);

const isFirstWindow = computed((): boolean => window.value === 0);
const isLastWindow = computed(
  (): boolean => lengthWindow.value === window.value
);

const paginationRef = ref<Nullable<HTMLElement>>(null);
const { width } = useElementSize(paginationRef);

const fixedWidth = computed((): Optional<string> => {
  switch (true) {
    case width.value === 0:
      return undefined;
    case Math.ceil(width.value) % 2 !== 0:
      return createMeasurableProp(Math.ceil(width.value + 1));
    default:
      return createMeasurableProp(Math.ceil(width.value));
  }
});
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
.pagination--absolute-center {
  position: absolute;
  left: 50%;
  transform: translateX(50%);
}
</style>
