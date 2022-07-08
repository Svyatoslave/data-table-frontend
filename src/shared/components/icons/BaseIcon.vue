<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title v-if="alt !== undefined">{{ alt }}</title>
    <slot></slot>
  </svg>
</template>

<script setup lang="ts">
export interface BaseIconProps {
  width?: number;
  height?: number;
  viewBox?: string;
  alt?: string;
}

withDefaults(defineProps<BaseIconProps>(), {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
});
</script>
