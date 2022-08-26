<template>
  <VModal
    id="modal"
    title="Выбор участников"
    subtitle="Для подтверждения формирования проекта выберите членов комиссии из выпадающего списка"
    @close="emit('close')"
  >
    <div class="fsm">
      <div class="fsm__subtitle"></div>
      <div class="fsm__content">
        <EditableCommissionMembersTable
          editable
          initialHasAddRaw
          selectTeleportTo="#modal"
          :commissionMembers="selected"
          @select="changeSelected"
          @delete="deleteSelected"
        />
      </div>
    </div>
    <template #actions>
      <VButton variant="contained" color="primary" @click="emit('next')">
        Сохранить
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
import {
  type CommissionMember,
  EditableCommissionMembersTable,
} from "@/features/commission-members";

export interface SelectCommissionMembersStepProps {
  selected: CommissionMember[];
}

export interface SelectCommissionMembersStepEmits {
  (e: "next"): void;
  (e: "close"): void;
  (e: "cancel"): void;
  (e: "changeSelected", value: CommissionMember): void;
  (e: "deleteSelected", value: CommissionMember): void;
}

defineProps<SelectCommissionMembersStepProps>();

const emit = defineEmits<SelectCommissionMembersStepEmits>();

const deleteSelected = (commissionMember: CommissionMember) => {
  emit("deleteSelected", commissionMember);
};

const changeSelected = (commissionMember: CommissionMember) => {
  emit("changeSelected", commissionMember);
};
</script>
