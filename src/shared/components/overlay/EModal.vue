<template>
  <div
    v-if="visible"
    ref="containerRef"
    class="modal"
    :class="{ [`modal--full-height`]: fullHeight }"
  >
    <div class="modal__head">
      <div class="modal__head-info">
        <ETypography variant="title1" class="modal__title">
          {{ title }}
        </ETypography>
        <CrossIcon
          class="modal__button"
          @click="emit('update:visible', false)"
        />
      </div>
      <ETypography v-if="subtitle" variant="body5" class="modal__subtitle">
        {{ subtitle }}
      </ETypography>
    </div>
    <div class="modal__body">
      <slot></slot>
    </div>
    <div class="modal__footer">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside, useEventListener } from "@vueuse/core";

import { ETypography } from "@/shared/components/data-display";
import { CrossIcon } from "@/shared/components/icons";

export interface ModalProps {
  fullHeight?: boolean;
  visible: boolean;
  title: string;
  subtitle?: string;
}

interface ModalEmits {
  (e: "update:visible", value: boolean): void;
}

const emit = defineEmits<ModalEmits>();

withDefaults(defineProps<ModalProps>(), {
  fullHeight: false,
});

const containerRef = ref(null);

onClickOutside(containerRef, () => emit("update:visible", false));

useEventListener(document, "keydown", (event) => {
  if (event.key === "Escape") emit("update:visible", false);
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
.modal--full-height {
  min-height: 840px;
}
.modal__head {
  background-color: var(--white-color);
  top: 0;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal__head-info {
  display: flex;
  justify-content: space-between;
}
.modal__title {
  color: var(--black-color);
}

.modal__subtitle {
  color: var(--black-color);
}

.modal__body {
  overflow-y: auto;
  margin: 20px 4px;
  margin-bottom: 0;
  padding: 0 26px;
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

.modal__button {
  cursor: pointer;
}
</style>
