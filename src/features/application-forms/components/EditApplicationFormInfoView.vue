<template>
<VModalOverlay :visible="visible">
  <VModal
    title="Изменение дополнительной информация для заявки"
  >
    <div class="fsm">
      <div class="fsm__subtitle"></div>
        <div  class="dafm">
          <div class="dafm__content">
            <VTypography class="dafm__text" variant="body4">Краткая геологическая характеристика</VTypography>
            <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="false"
        name="name1"
        :manualFocus="show"
        placeholder="placeholder"
        modelValue="formatedValue"
        class="dafm__text"
      />
            <VTypography class="dafm__text" variant="body4">
              Полезные ископаемые
            </VTypography>
      <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="false"
        name="name1"
        :manualFocus="show"
        placeholder="placeholder"
        modelValue="formatedValue"
        class="dafm__text"
      />
      <VTypography class="dafm__text" variant="body4">Информация о запасах и ресурсах</VTypography>
            <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="false"
        name="name1"
        :manualFocus="show"
        placeholder="placeholder"
        modelValue="formatedValue"
        class="dafm__text"
      />
      <VTypography class="dafm__text" variant="body4">Основание начала процедуры</VTypography>
            <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="false"
        name="name1"
        :manualFocus="show"
        placeholder="placeholder"
        modelValue="formatedValue"
        class="dafm__text"
      />
      <VTypography class="dafm__text" variant="body4">Краткие сведения о ранее выполненных пользователем недр условиях пользования недрами</VTypography>
            <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="false"
        name="name1"
        :manualFocus="show"
        placeholder="placeholder"
        modelValue="formatedValue"
        class="dafm__text"
      />
      <VTypography class="dafm__text" variant="body4">Краткое описание фактических обстоятельств</VTypography>
            <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="false"
        name="name1"
        :manualFocus="show"
        placeholder="placeholder"
        modelValue="formatedValue"
        class="dafm__text"
      />
      <VTypography class="dafm__text" variant="body4">Информация о возникновении случая досрочного прекращения права пользования недрами, приостановления осуществления права пользования недрами, ограничения права пользователя недрами</VTypography>
            <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="false"
        name="name1"
        :manualFocus="show"
        placeholder="placeholder"
        modelValue="formatedValue"
        class="dafm__text"
      />
      <VTypography class="dafm__text" variant="body4">Информация об устранении допущенных нарушений условий пользования недрами</VTypography>
            <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="false"
        name="name1"
        :manualFocus="show"
        placeholder="placeholder"
        modelValue="formatedValue"
        class="dafm__text"
      />
      <VTypography class="dafm__text" variant="body4">Иные сведения</VTypography>
            <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="false"
        name="name1"
        :manualFocus="show"
        placeholder="placeholder"
        modelValue="formatedValue"
        class="dafm__text"
      />
      <VTypography class="dafm__text" variant="body4">Обоснование принимаемого решения</VTypography>
            <VTextInput
        readonly
        ref="inputRef"
        type="text"
        :disabled="false"
        name="name1"
        :manualFocus="show"
        placeholder="placeholder"
        modelValue="formatedValue"
        class="dafm__text"
      />
          </div>
        </div>
      </div>
  </VModal>
  </VModalOverlay>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { VModal,VModalOverlay } from "@/shared/components/overlay";
import { VTypography } from "@/shared/components/data-display";
import { isNonNullable } from "@/shared/utils/equal";
import { VTextInput } from "@/shared/components/inputs";
import type { Nullable } from "@/shared/types/utility";

export interface FormingAgendaModalProps {
  visible: boolean;
}

const props = defineProps<FormingAgendaModalProps>();

const show = ref<boolean>(false);
const inputRef = ref<Nullable<HTMLElement>>(null);
</script>

<style scoped>

.dafm {
  display: grid;
  grid-row-gap: 20px;
}

.dafm__tilte {
  margin-bottom: 20px;
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
