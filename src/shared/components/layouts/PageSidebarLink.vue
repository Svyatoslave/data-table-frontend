<template>
  <RouterLink
    :to="to"
    class="sidebar-link"
    active-class="sidebar-link--active"
    exact-active-class="sidebar-link--active"
    :class="{
      [`sidebar-link--active`]: active,
    }"
  >
    <ETypography variant="title2" tag="h3">
      <slot></slot>
    </ETypography>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

import { ETypography } from "@/shared/components/data-display";
import { computed } from "vue";

export interface PageSidebarLinkProps {
  to: string;
}

const props = defineProps<PageSidebarLinkProps>();

const route = useRoute();

const active = computed((): boolean => route.path.startsWith(props.to));
</script>

<style scoped>
.sidebar-link {
  padding: 22px 30px;
  color: var(--blue-color);
  text-decoration: none;
  transition: all 0.075s;
}

.sidebar-link:hover,
.sidebar-link--active {
  background-color: var(--grayish-cyan-color);
}
</style>
