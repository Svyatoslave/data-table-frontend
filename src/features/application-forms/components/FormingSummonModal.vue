<template>
  <ModalOverlay :visible="visible">
    <EModal
      :visible="isCurrent(`confirmation`)"
      title="Подтверждение"
      subtitle="Подтвердите создание повестки/проекта из следующих заявок:"
      @update:visible="(value) => emit('update:visible', value)"
    >
      <div class="fsm">
        <div class="fsm__subtitle"></div>
        <div class="fsm__content">
          <table class="fsm__table">
            <tr>
              <td class="fsm__table-content">
                <ETypography class="dafm__text" variant="title3">
                  ID
                </ETypography>
              </td>
              <td class="fsm__table-content">
                <ETypography class="dafm__text" variant="title3">
                  Вид заявки
                </ETypography>
              </td>
            </tr>
            <tr
              v-for="{ id, typeApplicationFormText } in selected"
              :key="id"
              class="fsm__table-row"
            >
              <td class="fsm__table-content">
                <ETypography class="dafm__text" variant="body2">
                  {{ id }}
                </ETypography>
              </td>
              <td class="fsm__table-content">
                <ETypography class="dafm__text" variant="body2">
                  {{ typeApplicationFormText }}
                </ETypography>
              </td>
            </tr>
          </table>
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
          @click="emit('update:visible', false)"
          >Отменить
        </EButton>
      </template>
    </EModal>
    <SuccessDialog
      :visible="isCurrent(`success`)"
      title="Повестка успешно создана"
      subtitle="Подробная информация будет доступна в разделе «Повестки»"
      @update:visible="(value) => emit('update:visible', value)"
      @success="handleSuccess"
    />
    <ErrorDialog
      :visible="isCurrent(`error`)"
      title="Ошибка сервера"
      subtitle="Повестка не создана. Проверьте подключение к интернету"
      @update:visible="(value) => emit('update:visible', value)"
      @failure="handleError"
    />
  </ModalOverlay>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMutation } from "vue-query";
import { useStepper } from "@vueuse/core";

import {
  EModal,
  ModalOverlay,
  SuccessDialog,
  ErrorDialog,
} from "@/shared/components/overlay";
import { ETypography } from "@/shared/components/data-display";
import { EButton } from "@/shared/components/inputs";
import {
  formingSummon,
  type ApplicationForm,
} from "@/features/application-forms";

export interface FormingAgendaModalProps {
  visible: boolean;
  selected: ApplicationForm[];
}

export interface FormingAgendaModalEmits {
  (e: "update:visible", value: boolean): void;
  (e: "success"): void;
}

const props = defineProps<FormingAgendaModalProps>();

const emit = defineEmits<FormingAgendaModalEmits>();

const { goTo, isCurrent } = useStepper(["confirmation", "success", "error"]);

const { mutate, isLoading } = useMutation(formingSummon, {
  onSuccess: () => {
    goTo("success");
  },
  onError: () => {
    goTo("error");
  },
});

const selectedIds = computed((): number[] =>
  props.selected.map(({ id }) => id)
);

const handleConfirmation = () => {
  mutate({ applicationFormIds: selectedIds.value });
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
