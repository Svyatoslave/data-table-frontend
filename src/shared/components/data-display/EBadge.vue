<template>
  <div class="badge">
    <slot></slot>
    <ETypography tag="span" variant="title3" class="badge__some">
      <slot name="content"></slot>
    </ETypography>
  </div>
</template>

<script setup lang="ts">
import { ETypography } from "@/shared/components/data-display";
</script>

<style scoped>
.badge {
  position: relative;
  display: flex;
}

.badge__some {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-width: 6px;
  height: 14px;
  padding: 2px 5px;
  text-align: center;
  border-radius: 10px;
  background-color: var(--yellow-color);
  color: var(--blue-color);
  transform: scale(1) translate(50%, -50%);
  transform-origin: 100% 0%;
  z-index: 1;
}
</style>
