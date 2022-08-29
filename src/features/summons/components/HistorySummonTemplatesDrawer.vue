<template>
  <VDrawer
    :visible="visible"
    :loading="isFetching"
    class="hstd"
    @close="emit('close')"
  >
    <template v-if="isNonNullable(data)">
      <VTypography variant="title1" class="hstd__title">
        Версии шаблона
      </VTypography>
      <div class="hstd__links">
        <template v-for="(stv, idx) in data.items" :key="stv.name">
          <SummonTemplateVersionLink
            :active="isActive(stv)"
            :summon-id="summonId"
            :summon-template-version="stv"
            @click="handleClickLink"
          />
          <VDivider v-if="idx !== data.items.length - 1" />
        </template>
      </div>
    </template>
  </VDrawer>
</template>

<script setup lang="ts">
import { toRef } from "vue";

import { VDivider, VTypography } from "@/shared/components/data-display";
import { VDrawer } from "@/shared/components/overlay";
import { isNonNullable } from "@/shared/utils/equal";
import type { Nullable } from "@/shared/types/utility";
import {
  SummonTemplateVersionLink,
  useSummonTemplateVersions,
  type SummonTemplateVersion,
} from "@/features/summons";

interface HistorySummonTemplatesDrawerProps {
  visible: boolean;
  summonId: string;
  summonTemplateName: Nullable<string>;
}

interface HistorySummonTemplatesDrawerEmits {
  (e: "close"): void;
}

const props = defineProps<HistorySummonTemplatesDrawerProps>();

const emit = defineEmits<HistorySummonTemplatesDrawerEmits>();

const { isFetching, data } = useSummonTemplateVersions({
  enabled: toRef(props, "visible"),
  summonID: props.summonId,
});

const isActive = (summonTemplateVersion: SummonTemplateVersion): boolean =>
  isNonNullable(props.summonTemplateName)
    ? summonTemplateVersion.name === props.summonTemplateName
    : summonTemplateVersion.isLatest;

const handleClickLink = () => {
  emit("close");
};
</script>

<style scoped>
.hstd {
  width: 400px;
}

.hstd__title {
  padding: 0 25px;
}

.hstd__links {
  margin-top: 40px;
  overflow-y: auto;
}

.hstd__links::-webkit-scrollbar {
  width: 6px;
}

.hstd__links::-webkit-scrollbar-track {
  height: 640px;
  border-radius: 4px;
}

.hstd__links::-webkit-scrollbar-thumb {
  background: #c9c9d6;
  border-radius: 4px;
}
</style>
