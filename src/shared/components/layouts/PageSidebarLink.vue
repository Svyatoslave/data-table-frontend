<template>
  <RouterLink :to="to" class="sidebar-link" active-class="sidebar-link--active">
    <ETypography variant="title2" tag="h3">
      <slot></slot>
    </ETypography>
  </RouterLink>
  <EDivider v-if="hasDivider" />
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { EDivider, ETypography } from "@/shared/components/data-display";

export interface PageSidebarLinkProps {
  to: string;
  hasDivider?: boolean;
}

withDefaults(defineProps<PageSidebarLinkProps>(), { hasDivider: true });
</script>

<style scoped>
.sidebar-link {
  padding: 22px 30px;
  color: var(--dark-blue-color);
  text-decoration: none;
  transition: all 0.075s;
}

.sidebar-link:hover,
.sidebar-link--active {
  background-color: var(--grayish-cyan-color);
}
</style>
