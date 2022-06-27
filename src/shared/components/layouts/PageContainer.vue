<template>
  <ContentContainer tag="main" class="container">
    <slot></slot>
  </ContentContainer>
</template>

<script setup lang="ts">
import { ContentContainer } from "@/shared/components/layouts";
</script>

<style scoped>
.container {
  margin-left: var(--sidebar-width);
  background-color: var(--light-gray-color);
}
</style>
