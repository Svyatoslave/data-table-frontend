<template>
  <PageSubLinks :sub-links="subLinks" />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { type SubLink, PageSubLinks } from "@/shared/components/layouts";

export interface SummonSubLinksProps {
  summonId: string;
}

const props = defineProps<SummonSubLinksProps>();

const subLinks = computed((): SubLink[] => [
  {
    key: "summonApplicationForm",
    disabled: false,
    to: `/summons/${props.summonId}/application-forms`,
    name: "Заявки",
  },
  {
    key: "summonInfo",
    disabled: false,
    to: `/summons/${props.summonId}/info`,
    name: "Информация",
  },
  {
    key: "summonTemplate",
    disabled: false,
    to: `/summons/${props.summonId}/template`,
    name: "Шаблон",
  },
  {
    key: "summonSuggestChange",
    disabled: true,
    to: `/summons/${props.summonId}/suggest-change`,
    name: "Предложить изменение",
  },
  {
    key: "summonCommissionMembers",
    disabled: false,
    to: `/summons/${props.summonId}/commission-members`,
    name: "Участники комиссии",
  },
]);
</script>
