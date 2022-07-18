<template>
  <Transition>
    <div
      v-if="visible"
      class="loading-overlay"
      :class="{ [`loading-overlay--fixed`]: fixed }"
    >
      <LoadingIcon :size="40" class="loading-overlay__icon" />
      <ETypography variant="body9" class="loading-overlay__text">
        Загрузка
      </ETypography>
      <div class="loading-overlay__some"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { LoadingIcon } from "@/shared/components/icons";
import { ETypography } from "@/shared/components/data-display";

export interface LoadingOverlayProps {
  fixed?: boolean;
  visible: boolean;
}

withDefaults(defineProps<LoadingOverlayProps>(), {
  fixed: false,
});
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
  z-index: 200;
}

.loading-overlay--fixed {
  position: fixed;
  margin-top: var(--header-full-height);
  margin-left: var(--sidebar-width);
  margin-bottom: var(--footer-height);
}

.loading-overlay__some {
  position: absolute;
  inset: 0px;
  opacity: 0.5;
  background-color: var(--white-color);
  z-index: 100;
}

.loading-overlay__icon {
  z-index: 101;
}
.loading-overlay__text {
  color: var(--blue-color);
  z-index: 101;
}
</style>
