<template>
  <SEO title="Информация о повестке" />
  <PageLayout>
    <template #header-actions>
      <SummonsBackLink />
    </template>
    <template #header><SummonSubLinks :summon-id="summonID" /></template>
    <template #default>
      <PagePaper :loading="isFetching">
        <template v-if="isNonNullable(data)">
          <div class="siv">
            <VTypography variant="title1" class="siv__tilte">
              Подробная информация о повестке
            </VTypography>
            <div class="siv__content">
              <VTypography class="siv__text" variant="body4"
                >Тип процедуры:</VTypography
              >
              <VTypography class="siv__text" variant="body4">
                {{ data.typeProcedure }}
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                Заявка в ФГИС АЛСН:
              </VTypography>
              <VInlineLink
                reference="https://balsamiq.cloud/sxqqsl5/ppb7ur0/r1D3A"
                color="primary"
              >
                balsamiq.cloud/sxqqsl5/ppb7ur0/r1D3A
              </VInlineLink>
            </div>
            <div class="siv__content">
              <VTypography variant="title2" class="siv__subtitle">
                Дата, время заседания
              </VTypography>
              <VTypography variant="title2" class="siv__subtitle">
                Дата, время формирования
              </VTypography>
              <VDatePicker
                ref="meetingAtVDatePickerRef"
                name="meeting-at"
                placeholder="Дата заседания"
                :value="oldMeetingAt"
                input-class="siv__date"
                @update:value="updateMeetingAt"
              />
              <VDatePicker
                disabled
                name="create-at"
                placeholder="Дата формирования"
                :value="data.createdAt"
                input-class="siv__date"
              />
            </div>
            <VTypography variant="title2" class="siv__subtitle">
              Информация о заявителях:
            </VTypography>
            <div class="siv__content">
              <VTypography class="siv__text" variant="body4">
                Заявитель:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                Общество с ограниченной ответственностью «Геомаркет»
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                Организационно правовая форма:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                Общество с ограниченной ответственностью
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                ОГРН:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                1053600591197
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                ИНН:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                3664069397
              </VTypography>
            </div>
            <VTypography variant="title2" class="siv__subtitle">
              Заголовок блока 1
            </VTypography>
            <div class="siv__content">
              <VTypography class="siv__text" variant="body4">
                Заявитель:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                Смирнов С.С.
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                ОГРН:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                1053600591197
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                ИНН:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                3664069397
              </VTypography>
            </div>
            <VTypography variant="title2" class="siv__subtitle">
              Заголовок блока 2
            </VTypography>
            <div class="siv__content">
              <VTypography class="siv__text" variant="body4">
                Вид полезного ископаемого:
              </VTypography>
              <VTypography class="siv__text" variant="body4">нефть</VTypography>
              <VTypography class="siv__text" variant="body4">
                Субьект РФ:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                Астраханская область
              </VTypography>
              <VTypography class="siv__text" variant="body4"
                >Дата, время:</VTypography
              >
              <VTypography class="siv__text" variant="body4">
                20.04.22 10:30
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                Статус повестки, проекта протокола:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                Черновик
              </VTypography>
            </div>
            <VTypography variant="title2" class="siv__subtitle">
              Заголовок блока 3
            </VTypography>
            <div class="siv__content">
              <VTypography class="siv__text" variant="body4">
                ID лицензии:
              </VTypography>
              <VTypography class="siv__text" variant="body4">101</VTypography>
              <VTypography class="siv__text" variant="body4">
                Дата регистрации лицензии:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                10.10.2010
              </VTypography>
              <VTypography class="siv__text" variant="body4"
                >Срок окончания действия лицензии:</VTypography
              >
              <VTypography class="siv__text" variant="body4">
                20.04.29
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                Площадь участка недр:
              </VTypography>
              <VTypography class="siv__text" variant="body4">1гм2</VTypography>
              <VTypography class="siv__text" variant="body4">
                Геологическая характеристика участка недр:
              </VTypography>
              <VFileLink
                :disabled="false"
                reference="https://www.figma.com/file/EyJzN50eJkdjDFHIO0u8BW/%D0%A0%D0%BE%D1%81%D0%BD%D0%B5%D0%B4%D1%80%D0%B0-(devs)?node-id=303%3A12479"
                color="primary"
              >
                Геологическая характеристика участка недр ООО «Геомаркет».pdf
              </VFileLink>
              <VTypography class="siv__text" variant="body4">
                Сведения:
              </VTypography>
              <VFileLink
                :disabled="false"
                reference="https://www.figma.com/file/EyJzN50eJkdjDFHIO0u8BW/%D0%A0%D0%BE%D1%81%D0%BD%D0%B5%D0%B4%D1%80%D0%B0-(devs)?node-id=303%3A12479"
                color="primary"
              >
                Сведения ООО «Геомаркет».pdf
              </VFileLink>
              <VTypography class="siv__text" variant="body4">
                Основания внесения изменений:
              </VTypography>
              <VTypography class="siv__text" variant="body4">
                Федеральный закон от 08.08.2001 N 129-ФЗ (ред. от 26.03.2022) «О
                государственной регистрации юридических лиц и индивидуальных
                предпринимателей»
              </VTypography>
            </div>
          </div></template
        >
      </PagePaper>
    </template>
    <template #footer>
      <VButton color="secondary" @click="handleOpenFormingModal">
        Сформировать протокол
      </VButton>
    </template>
  </PageLayout>
  <UpdateSummonMeetingAtModal
    :visible="visibleModal"
    :summon-id="summonID"
    :old-meeting-at="oldMeetingAt"
    :new-meeting-at="newMeetingAt"
    @update:visible="handleUpdateVisible"
    @success="handleSuccess"
    @cancel="handleCancel"
  />
  <FormingProtocolModal
    :visible="openedFormingModal"
    :summon-id="summonID"
    @close="handleCloseFormingModal"
    @success="handleSuccessForming"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { SEO } from "@/lib/meta";
import { useParamID } from "@/shared/composables";
import { PageLayout, PagePaper } from "@/shared/components/layouts";
import { VTypography } from "@/shared/components/data-display";
import { VInlineLink, VFileLink } from "@/shared/components/navigation";
import { VButton, VDatePicker } from "@/shared/components/inputs";
import { isNonNullable } from "@/shared/utils/equal";
import type { Nullable } from "@/shared/types/utility";
import {
  FormingProtocolModal,
  SummonsBackLink,
  SummonSubLinks,
  UpdateSummonMeetingAtModal,
  useFormingProtocolModal,
  useSummon,
  useUpdateSummonMeetingAtModal,
} from "@/features/summons";

const summonID = useParamID();

const {
  meetingAt: newMeetingAt,
  visibleModal,
  updateMeetingAt,
} = useUpdateSummonMeetingAtModal();

const { data, isFetching, refetch } = useSummon({
  summonID: summonID,
  onSuccess: (data) => {
    newMeetingAt.value = data.meetingAt;
  },
});

const {
  openedFormingModal,
  openFormingModal,
  closeFormingModal,
  redirectAfterSuccessForming,
} = useFormingProtocolModal();

const meetingAtVDatePickerRef =
  ref<Nullable<InstanceType<typeof VDatePicker>>>(null);

const oldMeetingAt = computed(
  (): Nullable<Date> =>
    isNonNullable(data.value) ? data.value.meetingAt : null
);

const handleSuccess = () => {
  refetch.value();
};

const handleCancel = () => {
  newMeetingAt.value = oldMeetingAt.value;
  meetingAtVDatePickerRef.value?.reset();
};

const handleUpdateVisible = (value: boolean) => {
  newMeetingAt.value = oldMeetingAt.value;
  visibleModal.value = value;
};

const handleOpenFormingModal = () => {
  openFormingModal();
};

const handleCloseFormingModal = () => {
  closeFormingModal();
};

const handleSuccessForming = () => {
  redirectAfterSuccessForming();
};
</script>

<style scoped>
.siv {
  display: grid;
  grid-row-gap: 20px;
}

.siv__content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px 20px;
}

.siv__tilte {
  margin-bottom: 20px;
}

.siv__subtitle {
  color: var(--black-color);
  margin-top: 20px;
}

.siv__text {
  color: var(--blue-color);
}
</style>

<style>
.siv__date {
  max-width: 310px;
}
</style>
