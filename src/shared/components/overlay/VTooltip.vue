<template>
  <NTooltip
    class="tolltip"
    :trigger="trigger"
    :placement="placement"
    :show-arrow="false"
    :z-index="zIndex"
    style="
      background-color: #f1f1f5;
      color: var(--black-color);
      border-radius: 3px;
      border: 1px solid #d2d2e2;
    "
  >
    <template #trigger>
      <slot name="trigger" class="trigger"></slot>
    </template>
    <slot class="tolltip__text"></slot>
  </NTooltip>
</template>
<script setup lang="ts">
import { NTooltip } from "naive-ui";

export type TriggerKind = "click" | "hover" | "focus" | "manual";

export type PlacementKind =
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "left-start"
  | "left"
  | "left-end";

export interface TooltipProps {
  trigger?: TriggerKind;
  placement?: PlacementKind;
  zIndex?: number;
}

withDefaults(defineProps<TooltipProps>(), {
  trigger: "hover",
  placement: "top",
  zIndex: 600,
});
</script>
<style scoped></style>
