<template>
  <SEO title="Информация о заявке" />
  <PageLayout>
    <template #header-actions>
      <ApplicationFormsBackLink />
    </template>
    <template #header>
      <ApplicationFormSublinks :application-form-id="applicationFormID" />
    </template>
    <template #default>
      <LoadingOverlay fixed :visible="isFetching" />
      <PagePaper v-if="isNonNullable(data)">
        <div class="dafm">
          <ETypography variant="title1" class="dafm__tilte">
            Подробная информация о заявке
          </ETypography>
          <div class="dafm__content">
            <ETypography class="dafm__text" variant="body4">ID:</ETypography>
            <ETypography class="dafm__text" variant="body4">
              {{ data.id }}
            </ETypography>
            <ETypography class="dafm__text" variant="body4">
              Тип процедуры:
            </ETypography>
            <ETypography class="dafm__text" variant="body4">
              {{ data.typeApplicationFormText }}
            </ETypography>
          </div>
          <EarlyTerminationInfo :early-termination="data" />
        </div>
      </PagePaper>
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { SEO } from "@/lib/meta";
import { useParamID } from "@/shared/composables";
import { LoadingOverlay } from "@/shared/components/overlay";
import { PageLayout, PagePaper } from "@/shared/components/layouts";
import { ETypography } from "@/shared/components/data-display";
import { isNonNullable } from "@/shared/utils/equal";
import {
  ApplicationFormsBackLink,
  ApplicationFormSublinks,
  EarlyTerminationInfo,
  useApplicationForm,
} from "@/features/application-forms";

const applicationFormID = useParamID();

const { data, isFetching } = useApplicationForm({
  applicationFormID,
});
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
