<template>
  <VTypography variant="title2" class="eti__title">
    Сведения о пользователе недр:
  </VTypography>
  <div class="eti__section">
    <VTypography class="eti__text" variant="body4">
      Пользователь недр / Наименование:
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.userInfoNedrProtocol.userNedr.companyName
        )
      }}
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      Пользователь недр / ФИО:
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{ userFullName }}
    </VTypography>
    <VTypography class="eti__text" variant="body4"> ОГРН: </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{ earlyTermination.userInfoNedrProtocol.ogrn }}
    </VTypography>
    <VTypography class="eti__text" variant="body4"> ИНН: </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{ earlyTermination.userInfoNedrProtocol.inn }}
    </VTypography>
  </div>
  <VTypography variant="title2" class="eti__subtitle">
    Общие сведения о лицензии и геологическая характеристика участка недр:
  </VTypography>
  <div class="eti__section">
    <VTypography class="eti__text" variant="body4">
      Лицензия на пользование недрами / Серия, Номер, Вид:
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.licenseUseNedr
            .lcNumberFull
        )
      }}
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      Вид и цель пользования недрами / Цель:
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol
            ?.vidAndPurposeUseNedr.purpose
        )
      }}
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      Вид и цель пользования недрами / Вид:
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol
            ?.vidAndPurposeUseNedr.vidSubsoilUse
        )
      }}
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      Наименование участка недр:
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.areaNedrName
        )
      }}
    </VTypography>
    <VTypography class="eti__text" variant="body4"> Субъект РФ: </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.subjectRF
            .regionName
        )
      }}
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      Основание предоставление права:
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol
            ?.osnovanieGrantingRights.osnovanie
        )
      }}
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      Дата регистрации (первоначальная лицензия):
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayDate(
          earlyTermination.licenseAndGeologicalCharacterProtocol
            ?.dateRegStartInitialLicense
        )
      }}
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      Дата регистрации (действующая лицензия)
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayDate(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.dateRegStart
        )
      }}
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      Срок окончания действия лицензии
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayDate(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.dateRegEnd
        )
      }}
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      Статус участка недр
    </VTypography>
    <VTypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.statusAreaNedr
            ?.statusOtvod
        )
      }}
    </VTypography>
  </div>
</template>

<script setup lang="ts">
import { VTypography } from "@/shared/components/data-display";
import {
  NO_DATA,
  displayDate,
  displayNullableData,
} from "@/shared/utils/display";
import type { EarlyTerminationApplicationForm } from "@/features/application-forms";
import { computed } from "vue";
import { isNonNullable } from "@/shared/utils/equal";

export interface EarlyTerminationInfoProps {
  earlyTermination: EarlyTerminationApplicationForm;
}

const props = defineProps<EarlyTerminationInfoProps>();

const userFullName = computed<string>(() =>
  isNonNullable(
    props.earlyTermination.userInfoNedrProtocol.userNedr.firsNameIP
  ) &&
  isNonNullable(
    props.earlyTermination.userInfoNedrProtocol.userNedr.lastNameIP
  ) &&
  isNonNullable(
    props.earlyTermination.userInfoNedrProtocol.userNedr.patronymicIP
  )
    ? `${props.earlyTermination.userInfoNedrProtocol.userNedr.firsNameIP} ${props.earlyTermination.userInfoNedrProtocol.userNedr.lastNameIP} ${props.earlyTermination.userInfoNedrProtocol.userNedr.patronymicIP}`
    : NO_DATA
);
</script>

<style>
.eti__section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 10px;
}

.eti__title {
  color: var(--black-color);
  margin-top: 20px;
}

.eti__text {
  color: var(--blue-color);
}
</style>
