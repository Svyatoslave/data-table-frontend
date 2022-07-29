<template>
  <button type="button" class="pagination__button">
    <ETypography variant="body10" class="pagination__button_text">
      <slot></slot>
    </ETypography>
  </button>
</template>

<script setup lang="ts">
import { ETypography } from "@/shared/components/data-display";
</script>

<style scoped>
.pagination__button {
  display: flex;
  align-items: center;
  min-width: 22px;
  padding: 3px 7px;
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
  color: var(--white-color);
  transition: all 0.125s;
}

.pagination__button:hover {
  background: rgba(0, 40, 85, 0.2);
}
.pagination__button--active {
  background: var(--blue-color);
  border: 1px solid var(--white-color);
}
.pagination__button--active:hover {
  background: var(--blue-color);
}

.pagination__button_text {
  font-weight: 500;
}
</style>
