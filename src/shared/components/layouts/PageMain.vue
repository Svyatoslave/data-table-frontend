<template>
  <main class="main">
    <ContentContainer class="main__container">
      <slot></slot>
    </ContentContainer>
  </main>
</template>

<script setup lang="ts">
import { ContentContainer } from "@/shared/components/layouts";
</script>

<style scoped>
.main {
  background-color: var(--light-gray-color);
}

.main__container {
  position: relative;
  min-height: calc(
    100vh - var(--footer-height) - var(--header-full-height) - 80px
  );
  margin-left: var(--sidebar-width);
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>
