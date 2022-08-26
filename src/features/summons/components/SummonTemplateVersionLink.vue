<template>
  <RouterLink
    :to="to"
    class="stvl"
    active-class="stvl--active"
    exact-active-class="stvl--active"
    :class="{
      [`stvl--active`]: active,
    }"
  >
    <VTypography variant="title2" tag="h3">
      {{ displayDate(summonTemplateVersion.createdAt) }}
    </VTypography>
    <VTypography
      v-if="summonTemplateVersion.isLatest"
      variant="body3"
      class="stvl__current-version"
    >
      Текущая версия
    </VTypography>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

import { VTypography } from "@/shared/components/data-display";
import { displayDate } from "@/shared/utils/display";
import type { SummonTemplateVersion } from "@/features/summons";

export interface SummonTemplateVersionLinkProps {
  active: boolean;
  summonId: string;
  summonTemplateVersion: SummonTemplateVersion;
}

const props = defineProps<SummonTemplateVersionLinkProps>();

const to = computed<string>(
  () =>
    `/summons/${props.summonId}/template/${props.summonTemplateVersion.name}`
);
</script>

<style scoped>
.stvl {
  display: block;
  padding: 22px 25px;
  color: var(--blue-color);
  text-decoration: none;
  transition: all 0.075s;
}

.stvl:hover,
.stvl--active {
  background-color: var(--grayish-cyan-color);
}

.stvl__current-version {
  color: var(--green-color);
}
</style>
