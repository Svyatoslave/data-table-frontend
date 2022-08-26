<template>
  <div class="sub-links">
    <RouterLink
      v-for="{ key, disabled, to, name } in subLinks"
      custom
      :key="key"
      :to="to"
      v-slot="{ href, navigate }"
    >
      <VInlineLink
        :active="isActive(to)"
        :disabled="disabled"
        color="secondary"
        :reference="href"
        @click="navigate"
      >
        {{ name }}
      </VInlineLink>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

import { VInlineLink } from "@/shared/components/navigation";

export interface SubLink {
  key: string;
  disabled: boolean;
  to: string;
  name: string;
}

export interface PageSubLinksProps {
  subLinks: SubLink[];
}

defineProps<PageSubLinksProps>();

const route = useRoute();

const isActive = (to: string): boolean => route.path.startsWith(to);
</script>

<style scoped>
.sub-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 57px;
}
</style>
