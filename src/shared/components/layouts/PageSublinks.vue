<template>
  <div class="sublinks">
    <RouterLink
      v-for="{ key, disabled, to, name } in sublinks"
      custom
      :key="key"
      :to="to"
      v-slot="{ href, navigate, isActive }"
    >
      <InlineLink
        :active="isActive"
        :disabled="disabled"
        color="secondary"
        :reference="href"
        @click="navigate"
      >
        {{ name }}
      </InlineLink>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

import { InlineLink } from "@/shared/components/navigation";

export interface Sublink {
  key: string;
  disabled: boolean;
  to: string;
  name: string;
}

export interface PageSubliksProps {
  sublinks: Sublink[];
}

defineProps<PageSubliksProps>();
</script>

<style scoped>
.sublinks {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 57px;
}
</style>
