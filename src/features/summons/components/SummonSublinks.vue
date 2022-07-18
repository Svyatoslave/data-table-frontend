<template>
  <PageSublinks :sublinks="sublinks" />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { PageSublinks, type Sublink } from "@/shared/components/layouts";

export interface SummonSublinksProps {
  summonId: string;
}

const props = defineProps<SummonSublinksProps>();

const sublinks = computed((): Sublink[] => [
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
    disabled: true,
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
    disabled: true,
    to: `/summons/${props.summonId}/commission-members`,
    name: "Участники комиссии",
  },
]);
</script>
