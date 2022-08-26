<template>
  <div
    ref="containerRef"
    class="modal"
    :class="[
      `modal--size-${size}`,
      {
        [`modal--loading`]: loading,
        [`modal--full-height`]: fullHeight,
        [`modal--centered`]: centered,
      },
    ]"
  >
    <VLoadingOverlay closing hasOverlay :visible="loading" />
    <CrossIcon hoverable class="modal__close" @click="emit('close')" />
    <div class="modal__head">
      <VTypography
        variant="title1"
        class="modal__title"
        :class="{ [`modal__title--centered`]: centered }"
      >
        {{ title }}
      </VTypography>
      <VTypography
        v-if="subtitle"
        variant="body5"
        class="modal__subtitle"
        :class="{ [`modal__subtitle--centered`]: centered }"
      >
        {{ subtitle }}
      </VTypography>
    </div>
    <div
      v-if="hasDefaultSlot"
      class="modal__body"
      :class="{ [`modal__body--not-padding`]: notPaddingBody }"
    >
      <slot></slot>
    </div>
    <div v-if="hasActionsSlot" class="modal__footer">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import { onClickOutside, useEventListener } from "@vueuse/core";

import { VTypography } from "@/shared/components/data-display";
import { CrossIcon } from "@/shared/components/icons";
import { VLoadingOverlay } from "@/shared/components/overlay";
import { hasSlotContent } from "@/shared/utils/vue";

export type ModalSizeKind = "m" | "l";

export interface ModalProps {
  centered?: boolean;
  loading?: boolean;
  fullHeight?: boolean;
  notPaddingBody?: boolean;
  size?: ModalSizeKind;
  title: string;
  subtitle?: string;
}

interface ModalEmits {
  (e: "close"): void;
}

withDefaults(defineProps<ModalProps>(), {
  centered: false,
  loading: false,
  fullHeight: false,
  notPaddingBody: false,
  size: "l",
});

const emit = defineEmits<ModalEmits>();

const slots = useSlots();

const containerRef = ref(null);

const hasDefaultSlot = computed<boolean>(() => hasSlotContent(slots.default));
const hasActionsSlot = computed<boolean>(() => hasSlotContent(slots.actions));

onClickOutside(containerRef, () => emit("close"));

useEventListener(document, "keydown", (event) => {
  if (event.key === "Escape") emit("close");
});
</script>

<style scoped>
.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 840px;
  max-height: calc(100vh - 60px);
  margin: 30px auto;
  background-color: var(--white-color);
  border-radius: 4px;
  transition: all 0.3s ease;
  overflow-y: auto;
}

.modal--size-l {
  width: 840px;
}

.modal--size-m {
  width: 600px;
}

.modal--loading {
  height: 458px;
}

.modal--full-height {
  min-height: 840px;
}

.modal--centered {
  align-items: center;
}

.modal__head {
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  gap: 15px;
}

.modal__title {
  color: var(--black-color);
}

.modal__title--centered {
  text-align: center;
}

.modal__subtitle {
  color: var(--black-color);
}

.modal__subtitle--centered {
  text-align: center;
}

.modal__body {
  overflow-y: auto;
  margin: 20px 4px;
  margin-bottom: 0;
  padding: 0 26px;
}

.modal__body--not-padding {
  margin: 5 4px;
  padding: 0 10px;
}

.modal__body::-webkit-scrollbar {
  width: 6px;
}

.modal__body::-webkit-scrollbar-track {
  height: 640px;
  border-radius: 4px;
}

.modal__body::-webkit-scrollbar-thumb {
  background: #c9c9d6;
  border-radius: 4px;
}

.modal__footer {
  background-color: var(--white-color);
  bottom: 0;
  padding: 20px 30px;
  display: flex;
  gap: 10px;
}

.modal__close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
