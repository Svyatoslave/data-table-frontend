<template>
  <VModal
    title="Подтверждение"
    subtitle="Подтвердите создание повестки/проекта из следующих заявок:"
    @close="emit('cancel')"
  >
    <div class="fsm">
      <div class="fsm__subtitle"></div>
      <div class="fsm__content">
        <VTable>
          <template #header>
            <VTr>
              <VTh>ID</VTh>
              <VTh>Номер лицензии</VTh>
              <VTh>Тип процедуры</VTh>
              <VTh>Наименование участка недр</VTh>
            </VTr>
          </template>
          <template #body>
            <VTr
              v-for="{ id, numberLicense, type, nameAreaNedr } in selected"
              :key="id"
              class="fsm__table-row"
            >
              <VTd>
                {{ id }}
              </VTd>
              <VTd>
                {{ numberLicense }}
              </VTd>
              <VTd>
                {{ type }}
              </VTd>
              <VTd>
                {{ nameAreaNedr }}
              </VTd>
            </VTr>
          </template>
        </VTable>
      </div>
    </div>
    <template #actions>
      <VButton variant="contained" color="primary" @click="emit('next')">
        Выбрать
      </VButton>
      <VButton variant="outlined" color="primary" @click="emit('cancel')"
        >Отменить
      </VButton>
    </template>
  </VModal>
</template>
<script setup lang="ts">
import { VModal } from "@/shared/components/overlay";
import { VButton } from "@/shared/components/inputs";
import type { ApplicationForm } from "@/features/application-forms";
import { VTable, VTd, VTr, VTh } from "@/shared/components/data-display";

export interface FormingAgendaModalProps {
  selected: ApplicationForm[];
}

export interface FormingAgendaModalEmits {
  (e: "next"): void;
  (e: "cancel"): void;
}

defineProps<FormingAgendaModalProps>();

const emit = defineEmits<FormingAgendaModalEmits>();
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
