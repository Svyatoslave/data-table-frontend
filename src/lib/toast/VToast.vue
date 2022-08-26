<template>
  <div
    class="toast"
    :class="[
      `toast--kind-${toast.kind}`,
      {
        [`toast--has-desc`]: hasDescription,
        [`toast--clickable`]: hasOnClick,
      },
    ]"
    @click="handleClick"
  >
    <div class="toast__head">
      <component :is="icon" />
    </div>
    <VTypography
      variant="body3"
      class="toast__body toast__title"
      :class="[`toast__body--kind-${toast.kind}`]"
    >
      {{ toast.title }}
    </VTypography>
    <VTypography
      v-if="hasDescription"
      variant="body5"
      class="toast__body toast__description"
      :class="[`toast__body--kind-${toast.kind}`]"
    >
      {{ toast.description }}
    </VTypography>
    <div class="toast__foot">
      <button
        type="button"
        class="toast__close"
        :class="[`toast__close--kind-${toast.kind}`]"
        @click="handleClose"
      >
        <CrossIcon :hoverable="false" :color="crossIconColor" :size="8" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component, computed, onMounted } from "vue";

import type { Toast } from "@/lib/toast";
import { VTypography } from "@/shared/components/data-display";
import {
  SuccessIcon,
  WarningIcon,
  InfoIcon,
  CrossIcon,
} from "@/shared/components/icons";
import { isNonNullable } from "@/shared/utils/equal";

export interface ToastProps {
  toast: Toast;
}

const props = defineProps<ToastProps>();

const hasDescription = computed<boolean>(() =>
  isNonNullable(props.toast.description)
);

const hasOnClick = computed<boolean>(() => isNonNullable(props.toast.onClick));

const icon = computed<Component>(() => {
  switch (props.toast.kind) {
    case "success":
      return SuccessIcon;
    case "warning":
      return WarningIcon;
    case "info":
    default:
      return InfoIcon;
  }
});

const crossIconColor = computed(() => {
  switch (props.toast.kind) {
    case "success":
      return "gray";
    case "warning":
      return "black";
    case "info":
    default:
      return "blue";
  }
});

const handleClick = () => {
  if (hasOnClick.value) {
    props.toast.onClick?.();
    props.toast.destroy();
  }
};

const handleClose = (event: MouseEvent) => {
  event.stopPropagation();

  props.toast.destroy();
};

onMounted(() => {
  props.toast.handleTimeoutDestroy();
});
</script>

<style scoped>
.toast {
  display: grid;
  grid-template-areas: "head title foot";
  gap: 16px;
  padding: 13px 20px;
  box-shadow: 0px 10px 19px rgba(0, 19, 41, 0.4);
  border-radius: 3px;
}

.toast--clickable {
  cursor: pointer;
}

.toast--kind-success {
  background-color: var(--green-color);
}

.toast--kind-warning {
  background-color: #fef0a3;
}

.toast--kind-info {
  background-color: var(--white-color);
}

.toast--has-desc {
  grid-template-areas: "head title foot" ". desc .";
  padding-bottom: 16px;
}

.toast__head {
  grid-area: head;
  display: flex;
}

.toast__body {
  margin-right: 36px;
}

.toast__body--kind-success {
  color: var(--white-color);
}

.toast__body--kind-info,
.toast__body--kind-warning {
  color: var(--black-color);
}

.toast__title {
  grid-area: title;
  display: flex;
  align-items: center;
}

.toast__description {
  grid-area: desc;
}

.toast__foot {
  grid-area: foot;
  display: flex;
}

.toast__close {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 100%;
  outline: none;
}

.toast__close:hover {
  cursor: pointer;
}

.toast__close--kind-success {
  background-color: rgba(0, 0, 0, 0.3);
}

.toast__close--kind-warning {
  background-color: #f0d761;
}

.toast__close--kind-info {
  background-color: var(--light-gray-color);
}
</style>
