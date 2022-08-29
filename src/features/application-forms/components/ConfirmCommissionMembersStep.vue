<template>
  <VModal
    title="Подтверждение действия"
    subtitle="Вы точно хотите сформировать повестку со следующими участниками?"
    @close="emit('close')"
  >
    <div class="ccm">
      <div class="ccm__subtitle"></div>
      <div class="ccm__content">
        <VTable>
          <template #colgroup>
            <colgroup>
              <col style="width: 34px" />
              <col style="width: 746px" />
            </colgroup>
          </template>
          <template #header>
            <VTr>
              <VTh>№</VTh>
              <VTh>ФИО</VTh>
            </VTr>
          </template>
          <template #body>
            <template v-if="selected !== undefined">
              <VTr v-for="(item, index) in selected" :key="item.id"
                ><VTd>{{ index + 1 }}</VTd>
                <VTd> {{ displayMembersCommissionFullName(item) }}</VTd>
              </VTr>
            </template>
          </template>
        </VTable>
      </div>
    </div>
    <template #actions>
      <VButton
        :loading="loading"
        variant="contained"
        color="primary"
        @click="emit('next')"
      >
        Подтвердить
      </VButton>
      <VButton variant="outlined" color="primary" @click="emit('cancel')">
        Отменить
      </VButton>
    </template>
  </VModal>
</template>

<script setup lang="ts">
import { VModal } from "@/shared/components/overlay";
import { VButton } from "@/shared/components/inputs";
import { VTable, VTd, VTr, VTh } from "@/shared/components/data-display";
import {
  type CommissionMember,
  displayMembersCommissionFullName,
} from "@/features/commission-members";

export interface ConfirmCommissionMembersStepProps {
  loading: boolean;
  selected: CommissionMember[];
}

export interface ConfirmCommissionMembersStepEmits {
  (e: "next"): void;
  (e: "close"): void;
  (e: "cancel"): void;
}

defineProps<ConfirmCommissionMembersStepProps>();

const emit = defineEmits<ConfirmCommissionMembersStepEmits>();
</script>

<style scoped>
.ccm__content {
  border: 1px solid #d2d2e2;
  border-radius: 4px;
}
.ccm__table {
  width: 100%;
  border-collapse: collapse;
}
.ccm__table-content {
  padding: 10px;
  border: 1px solid #d2d2e2;
}
</style>
