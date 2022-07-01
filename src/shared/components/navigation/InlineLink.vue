<template>
  <div class="inline-link">
    <a :href="reference" class="inline-link__body">
      <slot name="start-icon"></slot>
      <ETypography variant="body2"><slot></slot></ETypography>
      <slot name="end-icon"></slot>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ETypography } from "@/shared/components/data-display";

export interface InlineLinkProps {
  reference: string;
}
defineProps<InlineLinkProps>();
</script>

<style scoped>
.inline-link {
  display: inline-block;
}
.inline-link__body {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  text-decoration: none;
  color: var(--green-color);
}
</style>
