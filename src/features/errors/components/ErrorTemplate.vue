<template>
  <div class="error-template">
    <div class="error-template__container">
      <VTypography
        v-if="hasStatus"
        variant="title1"
        class="error-template__status"
      >
        {{ status }}
      </VTypography>
      <VTypography tag="h2" variant="title1" class="error-template__title">
        {{ title }}
      </VTypography>
      <VTypography
        v-for="(partDescription, idx) in partsDescription"
        :key="idx"
        tag="p"
        variant="body5"
        class="error-template__description"
      >
        {{ partDescription }}
      </VTypography>
      <div class="error-template__actions">
        <slot name="actions">
          <VButton
            size="l"
            variant="contained"
            color="primary"
            @click="handleRefresh"
          >
            Обновить
          </VButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { VTypography } from "@/shared/components/data-display";
import { VButton } from "@/shared/components/inputs";
import { isNonNullable } from "@/shared/utils/equal";
import { refreshLocation } from "@/shared/utils/document";

export interface ErrorTemplateProps {
  status?: number;
  title: string;
  description: string;
}

const props = defineProps<ErrorTemplateProps>();

const hasStatus = computed<boolean>(() => isNonNullable(props.status));

const partsDescription = computed<string[]>(() =>
  props.description.split("\n\n")
);

const handleRefresh = () => {
  refreshLocation();
};
</script>

<style scoped>
.error-template {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--light-gray-color);
}

.error-template__container {
  max-width: 425px;
  padding: 51px 50px 40px;
  background-color: var(--white-color);
}

.error-template__status {
  font-weight: 600;
  font-size: 80px;
  line-height: 96px;
  color: var(--black-color);
}

.error-template__title {
  margin-top: 20px;
  color: var(--black-color);
}

.error-template__description {
  margin-top: 15px;
  color: var(--black-color);
}

.error-template__actions {
  margin-top: 75px;
}
</style>
