<template>
  <VModalOverlay :visible="visible">
    <VModal
      size="m"
      title="Подтверждение"
      subtitle="Вы точно хотите обновить дату заседания?"
      @close="emit('update:visible', false)"
    >
      <div class="fsm">
        <div class="fsm__subtitle"></div>
        <div class="fsm__content">
          <VTable>
            <template #header>
              <VTr>
                <VTh>Старая дата заседания</VTh>
                <VTh>Новая дата заседания</VTh>
              </VTr>
            </template>
            <template #body>
              <VTr class="fsm__table-row">
                <VTd>
                  {{ displayDate(oldMeetingAt) }}
                </VTd>
                <VTd>
                  {{ displayDate(newMeetingAt) }}
                </VTd>
              </VTr>
            </template>
          </VTable>
        </div>
      </div>
      <template #actions>
        <VButton
          :loading="isLoading"
          variant="contained"
          color="primary"
          @click="handleConfirmation"
        >
          Подтвердить
        </VButton>
        <VButton
          variant="outlined"
          color="primary"
          @click="emit('cancel'), emit('update:visible', false)"
        >
          Отменить
        </VButton>
      </template>
    </VModal>
  </VModalOverlay>
</template>

<script setup lang="ts">
import { VModal, VModalOverlay } from "@/shared/components/overlay";
import { VButton } from "@/shared/components/inputs";
import { VTable, VTd, VTr, VTh } from "@/shared/components/data-display";
import type { Nullable } from "@/shared/types/utility";
import { displayDate } from "@/shared/utils/display";
import { useUpdateSummonMeetingAt } from "../composables/use-update-summon-meeting-at";
import { useToast } from "@/lib/toast";

export interface UpdateSummonMeetingAtModalProps {
  visible: boolean;
  summonId: string;
  oldMeetingAt: Nullable<Date>;
  newMeetingAt: Nullable<Date>;
}

export interface UpdateSummonMeetingAtModalEmits {
  (e: "update:visible", value: boolean): void;
  (e: "cancel"): void;
  (e: "success"): void;
  (e: "failure"): void;
}

const props = defineProps<UpdateSummonMeetingAtModalProps>();

const emit = defineEmits<UpdateSummonMeetingAtModalEmits>();

const toast = useToast();

const { mutate, isLoading } = useUpdateSummonMeetingAt({
  onSuccess: () => {
    emit("update:visible", false);
    emit("success");
    toast({ kind: "success", title: "Дата заседания успешно обновлена" });
  },
  onError: () => {
    emit("update:visible", false);
    emit("failure");
    toast({ kind: "warning", title: "Ошибка сервера" });
  },
});

const handleConfirmation = () => {
  mutate({ summonID: props.summonId, meetingAt: props.newMeetingAt as Date });
};
</script>

<style scoped>
.fsm__content {
  border: 1px solid #d2d2e2;
  border-radius: 4px;
}
.fsm__table {
  width: 100%;
  border-collapse: collapse;
}
.fsm__table-content {
  padding: 10px;
  border: 1px solid #d2d2e2;
}
</style>
