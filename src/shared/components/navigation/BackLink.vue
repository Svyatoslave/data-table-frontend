<template>
  <EDivider flex-item orientation="vertical" class="divider" />
  <RouterLink :to="to" class="back-link">
    <BackIcon
      arrow-class="back-link__icon-arrow"
      line-class="back-link__icon-line"
    />
    <ETypography variant="body4"><slot></slot> </ETypography>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

import { ETypography } from "@/shared/components/data-display";
import { BackIcon } from "@/shared/components/icons";
import { EDivider } from "@/shared/components/data-display";

export interface BackLinkProps {
  to: string;
}

defineProps<BackLinkProps>();
</script>
<style scoped>
.divider {
  height: 100%;
}
.back-link {
  margin-right: 40px;
  margin-left: 20px;
  display: flex;
  gap: 15px;
  text-decoration: none;
  align-items: center;
  color: var(--blue-color);
}
.back-link:hover {
  color: var(--green-color);
}
</style>

<style>
.back-link:hover .back-link__icon-arrow {
  stroke: var(--green-color);
}

.back-link:hover .back-link__icon-line {
  fill: var(--green-color);
}
</style>
