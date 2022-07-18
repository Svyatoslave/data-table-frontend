<template>
  <ModalOverlay :visible="isNonEmptyDetailId">
    <EModal
      full-height
      :visible="isNonEmptyDetailId"
      title="Подробная информация о заявке"
      @update:visible="handleUpdateVisible"
    >
      <LoadingOverlay :visible="isFetching" />
      <div v-if="isNonNullable(data)" class="dafm">
        <div class="dafm__content">
          <ETypography class="dafm__text" variant="body4">ID:</ETypography>
          <ETypography class="dafm__text" variant="body4">{{
            data.id
          }}</ETypography>
          <ETypography class="dafm__text" variant="body4">
            Тип процедуры:
          </ETypography>
          <ETypography class="dafm__text" variant="body4">
            {{ data.typeApplicationForm }}
          </ETypography>
        </div>
        <EarlyTerminationInfo :early-termination="data" />
      </div>
    </EModal>
  </ModalOverlay>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ETypography } from "@/shared/components/data-display";
import {
  EModal,
  ModalOverlay,
  LoadingOverlay,
} from "@/shared/components/overlay";
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import {
  EarlyTerminationInfo,
  useApplicationForm,
} from "@/features/application-forms";

export interface DetailApplicationFormModalProps {
  queryKey: unknown[];
  detailId: Nullable<number>;
}

export interface DetailApplicationFormModalEmits {
  (e: "clear-detail-id"): void;
}

const props = defineProps<DetailApplicationFormModalProps>();

const emit = defineEmits<DetailApplicationFormModalEmits>();

const applicationFormID = computed(
  (): Nullable<string> => String(props.detailId)
);
const enabled = computed((): boolean => isNonNullable(props.detailId));

const { data, isFetching } = useApplicationForm({
  applicationFormID,
  enabled,
});

const isNonEmptyDetailId = computed((): boolean =>
  isNonNullable(props.detailId)
);

const handleUpdateVisible = () => {
  emit("clear-detail-id");
};
</script>

<style scoped>
.dafm {
  display: grid;
  grid-row-gap: 20px;
}

.dafm__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 10px;
}
.dafm__subtitle {
  color: var(--black-color);
  margin-top: 20px;
}
.dafm__text {
  color: var(--blue-color);
}
</style>
