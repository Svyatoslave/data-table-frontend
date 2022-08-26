<template>
  <SEO title="Информация о заявке" />
  <PageLayout>
    <template #header-actions>
      <ApplicationFormsBackLink />
    </template>
    <template #header>
      <ApplicationFormSubLinks :application-form-id="applicationFormID" />
    </template>
    <template #default>
      <PagePaper :loading="isFetching">
        <div v-if="isNonNullable(data)" class="dafm">
          <VTypography variant="title1" class="dafm__tilte">
            Подробная информация о заявке
          </VTypography>
          <div class="dafm__content">
            <VTypography class="dafm__text" variant="body4">ID:</VTypography>
            <VTypography class="dafm__text" variant="body4">
              {{ data.id }}
            </VTypography>
            <VTypography class="dafm__text" variant="body4">
              Тип процедуры:
            </VTypography>
            <VTypography class="dafm__text" variant="body4">
              {{ data.typeApplicationFormText }}
            </VTypography>
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
import { PageLayout, PagePaper } from "@/shared/components/layouts";
import { VTypography } from "@/shared/components/data-display";
import { isNonNullable } from "@/shared/utils/equal";
import {
  ApplicationFormsBackLink,
  ApplicationFormSubLinks,
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
