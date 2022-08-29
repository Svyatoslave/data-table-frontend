<template>
  <VModalOverlay :visible="visible">
    <ConfirmApplicationFormsStep
      v-if="isCurrent('confirm-forming-agenda')"
      :selected="selected"
      @next="goToNext"
      @cancel="handleCLose"
    />
    <SelectCommissionMembersStep
      v-if="isCurrent('forming-commission-members')"
      :selected="selectedCommissionMembers"
      @next="goToNext"
      @close="handleCLose"
      @cancel="handleCancel"
      @change-selected="changeSelected"
      @delete-selected="deleteSelected"
    />
    <ConfirmCommissionMembersStep
      v-if="isCurrent('confirm-commission-members')"
      :loading="isLoading"
      :selected="selectedCommissionMembers"
      @next="handleConfirmation"
      @close="handleCLose"
      @cancel="handleCancel"
    />
  </VModalOverlay>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStepper } from "@vueuse/core";
import { useMutation } from "vue-query";

import { useToast } from "@/lib/toast";
import { VModalOverlay } from "@/shared/components/overlay";
import {
  type ApplicationForm,
  ConfirmApplicationFormsStep,
  SelectCommissionMembersStep,
  ConfirmCommissionMembersStep,
  formingSummon,
} from "@/features/application-forms";
import { useCommissionMembersSelectable } from "@/features/commission-members";

export interface FormingAgendaModalProps {
  visible: boolean;
  selected: ApplicationForm[];
}

export interface FormingAgendaModalEmits {
  (e: "close"): void;
  (e: "success"): void;
  (e: "failure"): void;
}

const props = defineProps<FormingAgendaModalProps>();

const emit = defineEmits<FormingAgendaModalEmits>();

const { goToNext, goToPrevious, isCurrent, goTo } = useStepper([
  "confirm-forming-agenda",
  "forming-commission-members",
  "confirm-commission-members",
]);

const router = useRouter();
const toast = useToast();

const {
  selected: selectedCommissionMembers,
  selectedIds: selectedCommissionMembersIds,
  changeSelected,
  deleteSelected,
  clearSelected,
} = useCommissionMembersSelectable();

const { mutate, isLoading } = useMutation(formingSummon, {
  onSuccess: (summonID) => {
    clearSelected();
    goTo("confirm-forming-agenda");

    emit("close");
    emit("success");
    toast({
      kind: "success",
      title: "Повестка успешно создана",
      onClick: () => {
        router.push(`/summons/${summonID}/application-forms`);
      },
    });
  },
  onError: () => {
    clearSelected();
    goTo("confirm-forming-agenda");

    emit("close");
    emit("failure");
    toast({ kind: "warning", title: "Ошибка сервера" });
  },
});

const selectedIds = computed((): number[] =>
  props.selected.map(({ id }) => id)
);

const handleConfirmation = () => {
  mutate({
    commissionMembersIds: selectedCommissionMembersIds.value,
    applicationFormIds: selectedIds.value,
  });
};

const handleCLose = () => {
  emit("close");
  goTo("confirm-forming-agenda");
};

const handleCancel = () => {
  goToPrevious();
};
</script>

<style scoped></style>
