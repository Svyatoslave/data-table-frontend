<template>
  <ETypography variant="title2" class="eti__title">
    Сведения о пользователе недр:
  </ETypography>
  <div class="eti__section">
    <ETypography class="eti__text" variant="body4">
      Пользователь недр / Наименование:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.userInfoNedrProtocol.userNedr.companyName
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Пользователь недр / Фамилия:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.userInfoNedrProtocol.userNedr.lastNameIP
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Пользователь недр / Имя:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.userInfoNedrProtocol.userNedr.firsNameIP
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Пользователь недр / Отчество:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.userInfoNedrProtocol.userNedr.patronymicIP
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4"> ОГРН: </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{ earlyTermination.userInfoNedrProtocol.ogrn }}
    </ETypography>
    <ETypography class="eti__text" variant="body4"> ИНН: </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{ earlyTermination.userInfoNedrProtocol.inn }}
    </ETypography>
  </div>
  <ETypography variant="title2" class="eti__subtitle">
    Общие сведения о лицензии и геологическая характеристика участка недр:
  </ETypography>
  <div class="eti__section">
    <ETypography class="eti__text" variant="body4">
      Лицензия на пользование недрами / Серия:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.licenseUseNedr
            .series
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Лицензия на пользование недрами / Номер:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.licenseUseNedr
            .lcNumber
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Лицензия на пользование недрами / Вид:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.licenseUseNedr
            .lcVid
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Лицензия на пользование недрами / Серия, Номер, Вид:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.licenseUseNedr
            .lcNumberFull
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Вид и цель пользования недрами / Цель:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol
            ?.vidAndPurposeUseNedr.purpose
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Вид и цель пользования недрами / Вид:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol
            ?.vidAndPurposeUseNedr.vidSubsoilUse
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Наименование участка недр:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.areaNedrName
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4"> Субъект РФ: </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.subjectRF
            .regionName
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Основание предоставление права:
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol
            ?.osnovanieGrantingRights.osnovanie
        )
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Дата регистрации (первоначальная лицензия):
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        isNonNullable(
          earlyTermination.licenseAndGeologicalCharacterProtocol
            ?.dateRegStartInitialLicense
        )
          ? dayjs(
              earlyTermination.licenseAndGeologicalCharacterProtocol
                .dateRegStartInitialLicense
            ).format("DD.MM.YY HH:mm")
          : "Нет данных"
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Дата регистрации (действующая лицензия)
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        isNonNullable(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.dateRegStart
        )
          ? dayjs(
              earlyTermination.licenseAndGeologicalCharacterProtocol
                .dateRegStart
            ).format("DD.MM.YY HH:mm")
          : "Нет данных"
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Срок окончания действия лицензии
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        isNonNullable(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.dateRegEnd
        )
          ? dayjs(
              earlyTermination.licenseAndGeologicalCharacterProtocol.dateRegEnd
            ).format("DD.MM.YY HH:mm")
          : "Нет данных"
      }}
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      Статус участка недр
    </ETypography>
    <ETypography class="eti__text" variant="body4">
      {{
        displayNullableData(
          earlyTermination.licenseAndGeologicalCharacterProtocol?.statusAreaNedr
            ?.statusOtvod
        )
      }}
    </ETypography>
  </div>
</template>

<script setup lang="ts">
import { dayjs } from "@/lib/day-js";
import { ETypography } from "@/shared/components/data-display";
import { displayNullableData } from "@/shared/utils/display";
import { isNonNullable } from "@/shared/utils/equal";
import type { EarlyTerminationApplicationForm } from "@/features/application-forms";

export interface EarlyTerminationInfoProps {
  earlyTermination: EarlyTerminationApplicationForm;
}

defineProps<EarlyTerminationInfoProps>();
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
