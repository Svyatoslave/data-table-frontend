<template>
  <div v-if="visible" ref="containerRef" class="modal__container">
    <CrossIcon
      class="modal__button"
      @click="emit(`failure`), emit('update:visible', false)"
    />
    <div class="modal__content">
      <div class="modal__content-info">
        <ETypography variant="title1" class="modal__title">
          {{ title }}
        </ETypography>
      </div>

      <ETypography variant="body5" class="modal__subtitle">
        {{ subtitle }}
      </ETypography>
    </div>

    <div class="modal__footer">
      <EButton
        variant="contained"
        color="error"
        @click="emit(`failure`), emit('update:visible', false)"
      >
        ОК
      </EButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside, useEventListener } from "@vueuse/core";

import { ETypography } from "@/shared/components/data-display";
import { EButton } from "@/shared/components/inputs";
import { CrossIcon } from "@/shared/components/icons";

export interface SuccessDialogProps {
  visible: boolean;
  title: string;
  subtitle?: string;
}

interface SuccessDialogEmits {
  (e: "update:visible", value: boolean): void;
  (e: "failure"): void;
}

const emit = defineEmits<SuccessDialogEmits>();

defineProps<SuccessDialogProps>();

const containerRef = ref(null);

onClickOutside(containerRef, () => {
  emit("failure");
  emit("update:visible", false);
});

useEventListener(document, "keydown", (event) => {
  if (event.key === "Escape") {
    emit("failure");
    emit("update:visible", false);
  }
});
</script>
<style scoped>
.modal__container {
  position: relative;
  width: 600px;
  margin: 0px auto;
  background-color: var(--white-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}
.modal__content {
  background-color: var(--white-color);
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal__content-info {
  display: flex;
  justify-content: center;
}
.modal__title {
  color: var(--black-color);
  text-align: center;
}

.modal__subtitle {
  color: var(--black-color);
  text-align: center;
}

.modal__footer {
  background-color: var(--white-color);
  bottom: 0;
  padding: 20px 30px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.modal__button {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
