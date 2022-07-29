<template>
  <ModalOverlay :visible="visible">
    <EModal
      :visible="isCurrent(`confirmation`)"
      title="Подтверждение"
      subtitle="Вы точно хотите обновить дату заседания?"
      @update:visible="(value) => emit('update:visible', value)"
    >
      <div class="fsm">
        <div class="fsm__subtitle"></div>
        <div class="fsm__content">
          <ETable>
            <template #header>
              <ETr>
                <ETh>Старая дата заседания</ETh>
                <ETh>Новая дата заседания</ETh>
              </ETr>
            </template>
            <template #body>
              <ETr class="fsm__table-row">
                <ETd>
                  {{ displayDate(oldMeetingAt) }}
                </ETd>
                <ETd>
                  {{ displayDate(newMeetingAt) }}
                </ETd>
              </ETr>
            </template>
          </ETable>
        </div>
      </div>
      <template #actions>
        <EButton
          :loading="isLoading"
          variant="contained"
          color="primary"
          @click="handleConfirmation"
        >
          Подтвердить
        </EButton>
        <EButton
          variant="outlined"
          color="primary"
          @click="emit('cancel'), emit('update:visible', false)"
        >
          Отменить
        </EButton>
      </template>
    </EModal>
    <SuccessDialog
      :visible="isCurrent(`success`)"
      title="Дата заседания успешно обновлена"
      subtitle="Подробная обновленная информация будет доступна в разделе «Информация»"
      @update:visible="(value) => emit('update:visible', value)"
      @success="handleSuccess"
    />
    <ErrorDialog
      :visible="isCurrent(`error`)"
      title="Ошибка сервера"
      subtitle="Дата заседания не обновлена. Проверьте подключение к интернету"
      @update:visible="(value) => emit('update:visible', value)"
      @failure="handleError"
    />
  </ModalOverlay>
</template>

<script setup lang="ts">
import { useStepper } from "@vueuse/core";

import {
  EModal,
  ModalOverlay,
  SuccessDialog,
  ErrorDialog,
} from "@/shared/components/overlay";
import { EButton } from "@/shared/components/inputs";
import { ETable, ETd, ETr, ETh } from "@/shared/components/data-display";
import type { Nullable } from "@/shared/types/utility";
import { displayDate } from "@/shared/utils/display";
import { useUpdateSummonMeetingAt } from "../composables/use-update-summon-meeting-at";

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

const { goTo, isCurrent } = useStepper(["confirmation", "success", "error"]);

const { mutate, isLoading } = useUpdateSummonMeetingAt({
  onSuccess: () => {
    goTo("success");
  },
  onError: () => {
    goTo("error");
  },
});

const handleConfirmation = () => {
  mutate({ summonID: props.summonId, meetingAt: props.newMeetingAt as Date });
};

const handleSuccess = () => {
  goTo("confirmation");
  emit("success");
};

const handleError = () => {
  goTo("confirmation");
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
