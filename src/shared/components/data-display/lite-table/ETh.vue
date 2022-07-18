<template>
  <th class="content">
    <ETypography variant="title3">
      <slot></slot>
    </ETypography>
  </th>
</template>

<script setup lang="ts">
import { ETypography } from "@/shared/components/data-display";
</script>

<style scoped>
.content {
  padding: 10px;
  text-align: left;
  border: 1px solid #d2d2e2;
  border-top: 1px solid #d2d2e2;
}
</style>
