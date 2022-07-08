<template>
  <Transition>
    <div v-show="visible" class="loading-overlay">
      <LoadingIcon :size="40" class="loading-overlay__icon" />
      <ETypography variant="body9" class="loading-overlay__text"
        >Загрузка</ETypography
      >
      <div class="loading-overlay__some"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { LoadingIcon } from "@/shared/components/icons";
import { ETypography } from "@/shared/components/data-display";

export interface LoadingOverlayProps {
  visible: boolean;
}

defineProps<LoadingOverlayProps>();
</script>

<style scoped>
/* animation*/

.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 2000;
}

.loading-overlay__some {
  position: absolute;
  inset: 0px;
  opacity: 0.5;
  background-color: var(--white-color);
  z-index: 1000;
}

.loading-overlay__icon {
  z-index: 1001;
}
.loading-overlay__text {
  color: var(--blue-color);
  z-index: 1001;
}
</style>
