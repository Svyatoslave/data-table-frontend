<template>
  <td class="content">
    <VTypography variant="body5">
      <slot></slot>
    </VTypography>
  </td>
</template>

<script setup lang="ts">
import { VTypography } from "@/shared/components/data-display";
</script>

<style scoped>
.content {
  padding: 10px 10px 9px;
  color: var(--black-color);
  border: 1px solid #d2d2e2;
  border-top: 1px solid #d2d2e2;
}
</style>
