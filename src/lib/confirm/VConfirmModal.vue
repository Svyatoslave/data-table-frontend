<template>
  <VModal
    size="m"
    :title="confirm.title"
    :subtitle="confirm.subtitle"
    @close="handleClose"
  >
    <template #default>
      <component :is="confirm.slot"></component>
    </template>
    <template #actions>
      <div
        class="convirm-modal__actions"
        :class="{
          [`convirm-modal__actions--inverse`]: confirm.inverse,
        }"
      >
        <VButton
          :loading="isConfirmLoading"
          variant="contained"
          color="primary"
          @click="handleConfirm"
        >
          {{ confirmLabel }}
        </VButton>
        <VButton
          :loading="isCanceloading"
          variant="outlined"
          color="primary"
          @click="handleCancel"
        >
          {{ cancelLabel }}
        </VButton>
      </div>
    </template>
  </VModal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMutation } from "vue-query";

import type { ConfirmOptions } from "@/lib/confirm";
import { getOrElseNullable } from "@/shared/utils/functors";
import { VModal } from "@/shared/components/overlay";
import { VButton } from "@/shared/components/inputs";
import { noopFn } from "@/shared/utils/noop";

export interface ConfirmModalProps {
  confirm: ConfirmOptions;
  clearConfirm: () => void;
}

const props = defineProps<ConfirmModalProps>();

const { mutateAsync: confirmMutate, isLoading: isConfirmLoading } = useMutation(
  {
    mutationFn: getOrElseNullable(
      props.confirm.onConfirm,
      () => noopFn
    ) as () => Promise<void>,
  }
);
const { mutateAsync: cancelMutate, isLoading: isCanceloading } = useMutation({
  mutationFn: getOrElseNullable(
    props.confirm.onCancel,
    () => noopFn
  ) as () => Promise<void>,
});

const confirmLabel = computed<string>(() =>
  getOrElseNullable(props.confirm.labels?.confirm, () => "Подтвердить")
);
const cancelLabel = computed<string>(() =>
  getOrElseNullable(props.confirm.labels?.cancel, () => "Отменить")
);

const handleClose = () => {
  props.clearConfirm();
};

const handleConfirm = async () => {
  await confirmMutate();
  props.clearConfirm();
};

const handleCancel = async () => {
  await cancelMutate();
  props.clearConfirm();
};
</script>

<style scoped>
.convirm-modal__actions {
  display: flex;
  gap: 10px;
}

.convirm-modal__actions--inverse {
  flex-direction: row-reverse;
}
</style>
