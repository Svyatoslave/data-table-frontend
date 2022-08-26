<template>
  <VModalOverlay :visible="nonEmptyConfirm">
    <VConfirmModal
      :confirm="(confirm as ConfirmOptions)"
      :clear-confirm="clearConfirm"
    >
    </VConfirmModal>
  </VModalOverlay>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { type ConfirmOptions, VConfirmModal } from "@/lib/confirm";
import { VModalOverlay } from "@/shared/components/overlay";
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

export interface ConfirmContainerProps {
  confirm: Nullable<ConfirmOptions>;
  clearConfirm: () => void;
}

const props = defineProps<ConfirmContainerProps>();

const nonEmptyConfirm = computed<boolean>(() => isNonNullable(props.confirm));
</script>
