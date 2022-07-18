<template>
  <td class="content">
    <ETypography variant="body4">
      <slot></slot>
    </ETypography>
  </td>
</template>

<script setup lang="ts">
import { ETypography } from "@/shared/components/data-display";
</script>

<style scoped>
.content {
  padding: 10px;
  border: 1px solid #d2d2e2;
  border-top: 1px solid #d2d2e2;
}
</style>
