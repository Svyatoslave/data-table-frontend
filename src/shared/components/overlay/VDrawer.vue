<template>
  <Transition name="drawer">
    <div v-if="visible" ref="containerRef" class="drawer">
      <VLoadingOverlay closing hasOverlay :visible="loading" />
      <div class="drawer__head">
        <CrossIcon hoverable @click="handleClickCrossIcon" />
      </div>
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { onClickOutside, useEventListener } from "@vueuse/core";

import { CrossIcon } from "@/shared/components/icons";
import { VLoadingOverlay } from "@/shared/components/overlay";
import {
  documentDisabledScroll,
  documentEnabledScroll,
} from "@/shared/utils/document";
import type { Nullable } from "@/shared/types/utility";

export interface DrawerProps {
  visible: boolean;
  loading?: boolean;
}

export interface DrawerEmits {
  (e: "close"): void;
}

const props = withDefaults(defineProps<DrawerProps>(), {
  loading: false,
});

const emit = defineEmits<DrawerEmits>();

const containerRef = ref<Nullable<HTMLElement>>(null);

const handleClickCrossIcon = () => {
  emit("close");
};

onClickOutside(containerRef, () => emit("close"));

useEventListener(document, "keydown", (event) => {
  if (event.key === "Escape") emit("close");
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
  },
  { immediate: true }
);
</script>

<style scoped>
.drawer-move,
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.4s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--white-color);
  box-shadow: var(--header-shadow);
  z-index: 10000;
}

.drawer__head {
  display: flex;
  justify-content: flex-end;
  padding: 32px 40px 35px;
}
</style>
