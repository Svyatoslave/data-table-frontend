<template>
  <BaseIcon
    :width="size"
    :height="size"
    class="trash-icon"
    :class="{ [`trash-icon--disabled`]: disabled }"
  >
    <path d="M11.5 5.5V2.5H8.5V5.5" stroke="#002855" />
    <path d="M8.5 7.99976V14.9998" stroke="#002855" />
    <path d="M11.5 7.99976V14.9998" stroke="#002855" />
    <path d="M4.5 17.4998V5.49976H15.5V17.4998H4.5Z" stroke="#002855" />
    <path d="M2 5.49976H18" stroke="#002855" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface TrashIconProps {
  disabled?: boolean;
  size?: number;
}

withDefaults(defineProps<TrashIconProps>(), {
  disabled: false,
  size: 20,
});
</script>

<style scoped>
.trash-icon:hover {
  cursor: pointer;
}

.trash-icon:hover path {
  stroke: var(--green-color);
}

.trash-icon--disabled {
  pointer-events: none;
}

.trash-icon--disabled:hover {
  cursor: not-allowed;
}

.trash-icon--disabled path {
  stroke: var(--disabled-color);
}
</style>
