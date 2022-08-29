<template>
  <PageSubLinks :sub-links="subLinks" />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { PageSubLinks, type SubLink } from "@/shared/components/layouts";

export interface ApplicationFormSubLinksProps {
  applicationFormId: string;
}

const props = defineProps<ApplicationFormSubLinksProps>();

const subLinks = computed<SubLink[]>(() => [
  {
    key: "applicationFormInfo",
    disabled: false,
    to: `/application-forms/${props.applicationFormId}/info`,
    name: "Информация",
  },
]);
</script>
