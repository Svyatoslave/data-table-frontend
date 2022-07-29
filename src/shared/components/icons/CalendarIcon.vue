<template>
  <BaseIcon
    :width="size"
    :height="size"
    class="calendar-icon"
    :class="{
      [`calendar-icon--disabled`]: disabled,
      [`calendar-icon--active`]: active,
      [`calendar-icon--hoverable`]: hoverable,
    }"
  >
    <rect x="4.5" y="4.5" width="11" height="11" stroke="#002855" />
    <path d="M6 3.5H8" stroke="#002855" />
    <path d="M12 3.5H14" stroke="#002855" />
    <path d="M4.5 7.5H15.5" stroke="#002855" />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface CalendarIconProps {
  disabled?: boolean;
  active?: boolean;
  hoverable?: boolean;
  size?: number;
}

withDefaults(defineProps<CalendarIconProps>(), {
  disabled: false,
  active: false,
  hoverable: false,
  size: 20,
});
</script>

<style scoped>
.calendar-icon {
  outline: none;
  transition: all 0.125s;
}

.calendar-icon--disabled path,
.calendar-icon--disabled rect {
  stroke: #bfbfbf;
}

.calendar-icon--active path,
.calendar-icon--active rect {
  stroke: var(--green-color);
}

.calendar-icon--hoverable:hover {
  cursor: pointer;
}

.calendar-icon--hoverable:hover path,
.calendar-icon--hoverable:hover rect {
  stroke: var(--green-color);
}
</style>
