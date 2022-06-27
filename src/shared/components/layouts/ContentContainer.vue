<template>
  <component :is="tag" class="content-container">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
export interface ContentContainerProps {
  tag?: string;
}

withDefaults(defineProps<ContentContainerProps>(), { tag: "div" });
</script>

<style scoped>
.content-container {
  padding: 0 40px;
}
</style>
