<template>
  <Teleport to="body">
    <Transition>
      <div v-show="visible" class="modal">
        <div ref="containerRef" class="modal__container">
          <div class="modal__header">
            <ETypography variant="title1" class="modal__title">
              {{ title }}
            </ETypography>
            <CrossIcon
              class="modal__button"
              @click="emit('update:visible', false)"
            />
          </div>
          <div class="modal__body">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { onClickOutside, useEventListener } from "@vueuse/core";

import { ETypography } from "@/shared/components/data-display";

import { CrossIcon } from "@/shared/components/icons";
import {
  documentDisabledScroll,
  documentEnabledScroll,
} from "@/shared/utils/document";

export interface ModalProps {
  visible: boolean;
  title: string;
}

interface ModalEmits {
  (e: "update:visible", value: boolean): void;
}

const emit = defineEmits<ModalEmits>();

const props = defineProps<ModalProps>();

const containerRef = ref(null);

onClickOutside(containerRef, () => emit("update:visible", false));

useEventListener(document, "keydown", (event) => {
  if (event.key === "Escape") emit("update:visible", false);
});

watch(
  () => props.visible,
  (current) => {
    if (current) {
      documentDisabledScroll();
    } else {
      setTimeout(() => {
        documentEnabledScroll();
      }, 250);
    }
  }
);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;
  z-index: 10000;
}

.modal__container {
  width: 840px;
  margin: 0px auto;
  padding: 20px 30px 40px 30px;
  background: var(--white-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}
.modal__header {
  display: flex;
  justify-content: space-between;
}
.modal__title {
  color: var(--black-color);
}
.modal__body {
  margin-top: 40px;
}
.modal__button {
  cursor: pointer;
}
</style>
