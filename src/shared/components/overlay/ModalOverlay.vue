<template>
  <Teleport to="body">
    <Transition>
      <div v-if="visible" class="modal__overlay">
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { watch } from "vue";

import {
  documentDisabledScroll,
  documentEnabledScroll,
} from "@/shared/utils/document";

export interface ModalOverlayProps {
  visible: boolean;
}

const props = defineProps<ModalOverlayProps>();

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
.modal__overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;
  z-index: 1000;
}
</style>
