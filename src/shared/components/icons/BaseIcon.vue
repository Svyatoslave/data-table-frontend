<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
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
  alt?: string;
}

withDefaults(defineProps<BaseIconProps>(), {
  width: 20,
  height: 20,
});
</script>
