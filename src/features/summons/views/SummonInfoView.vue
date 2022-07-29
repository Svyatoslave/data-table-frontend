<template>
  <SEO title="Информация о повестке" />
  <PageLayout>
    <template #header-actions>
      <SummonsBackLink />
    </template>
    <template #header><SummonSublinks :summon-id="summonID" /></template>
    <template #default>
      <LoadingOverlay fixed :visible="isFetching" />
      <PagePaper v-if="isNonNullable(data)">
        <div class="siv">
          <ETypography variant="title1" class="siv__tilte">
            Подробная информация о повестке
          </ETypography>
          <div class="siv__content">
            <ETypography class="siv__text" variant="body4"
              >Тип процедуры:</ETypography
            >
            <ETypography class="siv__text" variant="body4">
              {{ data.typeProcedure }}
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              Заявка в ФГИС АЛСН:
            </ETypography>
            <InlineLink
              reference="https://balsamiq.cloud/sxqqsl5/ppb7ur0/r1D3A"
              color="primary"
            >
              balsamiq.cloud/sxqqsl5/ppb7ur0/r1D3A
            </InlineLink>
          </div>
          <div class="siv__content">
            <ETypography variant="title2" class="siv__subtitle">
              Дата, время заседания
            </ETypography>
            <ETypography variant="title2" class="siv__subtitle">
              Дата, время формирования
            </ETypography>
            <DatePicker
              ref="meetingAtDatePickerRef"
              name="meeting-at"
              placeholder="Дата заседания"
              :value="oldMeetingAt"
              input-class="siv__date"
              @update:value="updateMeetingAt"
            />
            <DatePicker
              disabled
              name="create-at"
              placeholder="Дата формирования"
              :value="data.createdAt"
              input-class="siv__date"
            />
          </div>
          <ETypography variant="title2" class="siv__subtitle">
            Информация о заявителях:
          </ETypography>
          <div class="siv__content">
            <ETypography class="siv__text" variant="body4">
              Заявитель:
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              Общество с ограниченной ответственностью «Геомаркет»
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              Организационно правовая форма:
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              Общество с ограниченной ответственностью
            </ETypography>
            <ETypography class="siv__text" variant="body4"> ОГРН: </ETypography>
            <ETypography class="siv__text" variant="body4">
              1053600591197
            </ETypography>
            <ETypography class="siv__text" variant="body4"> ИНН: </ETypography>
            <ETypography class="siv__text" variant="body4">
              3664069397
            </ETypography>
          </div>
          <ETypography variant="title2" class="siv__subtitle">
            Заголовок блока 1
          </ETypography>
          <div class="siv__content">
            <ETypography class="siv__text" variant="body4">
              Заявитель:
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              Смирнов С.С.
            </ETypography>
            <ETypography class="siv__text" variant="body4"> ОГРН: </ETypography>
            <ETypography class="siv__text" variant="body4">
              1053600591197
            </ETypography>
            <ETypography class="siv__text" variant="body4"> ИНН: </ETypography>
            <ETypography class="siv__text" variant="body4">
              3664069397
            </ETypography>
          </div>
          <ETypography variant="title2" class="siv__subtitle">
            Заголовок блока 2
          </ETypography>
          <div class="siv__content">
            <ETypography class="siv__text" variant="body4">
              Вид полезного ископаемого:
            </ETypography>
            <ETypography class="siv__text" variant="body4">нефть</ETypography>
            <ETypography class="siv__text" variant="body4">
              Субьект РФ:
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              Астраханская область
            </ETypography>
            <ETypography class="siv__text" variant="body4"
              >Дата, время:</ETypography
            >
            <ETypography class="siv__text" variant="body4">
              20.04.22 10:30
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              Статус повестки, проекта протокола:
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              Черновик
            </ETypography>
          </div>
          <ETypography variant="title2" class="siv__subtitle">
            Заголовок блока 3
          </ETypography>
          <div class="siv__content">
            <ETypography class="siv__text" variant="body4">
              ID лицензии:
            </ETypography>
            <ETypography class="siv__text" variant="body4">101</ETypography>
            <ETypography class="siv__text" variant="body4">
              Дата регистрации лицензии:
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              10.10.2010
            </ETypography>
            <ETypography class="siv__text" variant="body4"
              >Срок окончания действия лицензии:</ETypography
            >
            <ETypography class="siv__text" variant="body4">
              20.04.29
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              Площадь участка недр:
            </ETypography>
            <ETypography class="siv__text" variant="body4">1гм2</ETypography>
            <ETypography class="siv__text" variant="body4">
              Геологическая характеристика участка недр:
            </ETypography>
            <FileLink
              :disabled="false"
              reference="https://www.figma.com/file/EyJzN50eJkdjDFHIO0u8BW/%D0%A0%D0%BE%D1%81%D0%BD%D0%B5%D0%B4%D1%80%D0%B0-(devs)?node-id=303%3A12479"
              color="primary"
            >
              Геологическая характеристика участка недр ООО «Геомаркет».pdf
            </FileLink>
            <ETypography class="siv__text" variant="body4">
              Сведения:
            </ETypography>
            <FileLink
              :disabled="false"
              reference="https://www.figma.com/file/EyJzN50eJkdjDFHIO0u8BW/%D0%A0%D0%BE%D1%81%D0%BD%D0%B5%D0%B4%D1%80%D0%B0-(devs)?node-id=303%3A12479"
              color="primary"
            >
              Сведения ООО «Геомаркет».pdf
            </FileLink>
            <ETypography class="siv__text" variant="body4">
              Основания внесения изменений:
            </ETypography>
            <ETypography class="siv__text" variant="body4">
              Федеральный закон от 08.08.2001 N 129-ФЗ (ред. от 26.03.2022) «О
              государственной регистрации юридических лиц и индивидуальных
              предпринимателей»
            </ETypography>
          </div>
        </div>
      </PagePaper>
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
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { SEO } from "@/lib/meta";
import { useParamID } from "@/shared/composables";
import { LoadingOverlay } from "@/shared/components/overlay";
import { PageLayout, PagePaper } from "@/shared/components/layouts";
import { ETypography } from "@/shared/components/data-display";
import { isNonNullable } from "@/shared/utils/equal";
import {
  SummonsBackLink,
  SummonSublinks,
  UpdateSummonMeetingAtModal,
  useSummon,
  useUpdateSummonMeetingAtModal,
} from "@/features/summons";
import { InlineLink, FileLink } from "@/shared/components/navigation";
import type { Nullable } from "@/shared/types/utility";
import { DatePicker } from "@/shared/components/inputs";

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

const meetingAtDatePickerRef =
  ref<Nullable<InstanceType<typeof DatePicker>>>(null);

const oldMeetingAt = computed(
  (): Nullable<Date> =>
    isNonNullable(data.value) ? data.value.meetingAt : null
);

const handleSuccess = () => {
  refetch.value();
};

const handleCancel = () => {
  newMeetingAt.value = oldMeetingAt.value;
  meetingAtDatePickerRef.value?.reset();
};

const handleUpdateVisible = (value: boolean) => {
  newMeetingAt.value = oldMeetingAt.value;
  visibleModal.value = value;
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
