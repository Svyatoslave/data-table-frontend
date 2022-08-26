<template>
  <th class="content">
    <VTypography variant="title3">
      <slot></slot>
    </VTypography>
  </th>
</template>

<script setup lang="ts">
import { VTypography } from "@/shared/components/data-display";
</script>

<style scoped>
.content {
  padding: 10px;
  text-align: left;
  color: var(--black-color);
  border: 1px solid #d2d2e2;
  border-top: 1px solid #d2d2e2;
}
</style>
