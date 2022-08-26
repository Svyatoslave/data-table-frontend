<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toasts">
        <VToast v-for="toast in toasts" :key="toast.key" :toast="toast" />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { VToast, type Toast } from "@/lib/toast";

export interface ToastContainer {
  toasts: Toast[];
}

defineProps<ToastContainer>();
</script>

<style scoped>
.toasts-move,
.toasts-enter-active,
.toasts-leave-active {
  transition: all 0.25s ease;
}

.toasts-enter-from,
.toasts-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.toast-container {
  position: fixed;
  left: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  max-width: 600px;
  z-index: 100000;
}
</style>
