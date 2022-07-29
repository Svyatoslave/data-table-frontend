<template>
  <PageSublinks :sublinks="sublinks" />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { PageSublinks, type Sublink } from "@/shared/components/layouts";

export interface ApplicationFormSublinksProps {
  applicationFormId: string;
}

const props = defineProps<ApplicationFormSublinksProps>();

const sublinks = computed<Sublink[]>(() => [
  {
    key: "applicationFormInfo",
    disabled: false,
    to: `/application-forms/${props.applicationFormId}/info`,
    name: "Информация",
  },
]);
</script>
