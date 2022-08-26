<template>
  <div class="paper">
    <VLoadingOverlay closing fixed :visible="loading" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { VLoadingOverlay } from "@/shared/components/overlay";

interface PagePaperProps {
  loading?: boolean;
}

withDefaults(defineProps<PagePaperProps>(), {
  loading: false,
});
</script>

<style scoped>
.paper {
  position: relative;
  max-width: 1260px;
  margin: 0 auto;
  padding: 40px 80px;
  background-color: var(--white-color);
  box-shadow: var(--card-shadow);
  border-radius: 6px;
  min-height: calc(
    100vh - var(--footer-height) - var(--header-full-height) - 160px
  );
}
</style>
