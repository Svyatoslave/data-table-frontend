<template>
  <SEO title="Шаблон повестки" />
  <PageLayout>
    <template #header-actions>
      <SummonsBackLink />
    </template>
    <template #header>
      <SummonSubLinks :summon-id="summonID" />
    </template>
    <template #default>
      <PagePaper :loading="isFetching" class="stv__paper">
        <div
          v-if="!isFetching && isNonNullable(pdfBlobURL)"
          class="stv__wrapper"
        >
          <VPdf :source="pdfBlobURL" class="stv__pdf" />
        </div>
      </PagePaper>
    </template>
    <template #footer>
      <VButton color="secondary" @click="handleOpenFormingModal">
        Сформировать протокол
      </VButton>
      <div class="stv__actions">
        <ExportSummonTemplateDocxButton
          :summon-id="summonID"
          :summon-template-name="summonTemplateName"
        />
        <VButton color="secondary" @click="handleOpenImportModal">
          Импортировать новую версию
        </VButton>
        <VButton color="secondary" @click="handleOpenHistoryDrawer">
          Посмотреть версии шаблона
        </VButton>
      </div>
    </template>
  </PageLayout>
  <HistorySummonTemplatesDrawer
    :visible="visibleHistoryDrawer"
    :summon-id="summonID"
    :summon-template-name="summonTemplateName"
    @close="handleCloseHistoryDrawer"
  />
  <ImportSummonTemplateModal
    :visible="visibleImportModal"
    :summon-id="summonID"
    @close="handleCloseImportModal"
    @success="handleSuccessImport"
  />
  <FormingProtocolModal
    :visible="openedFormingModal"
    :summon-id="summonID"
    @close="handleCloseFormingModal"
    @success="handleSuccessForming"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import VPdf from "vue-pdf-embed";

import { SEO } from "@/lib/meta";
import { VButton } from "@/shared/components/inputs";
import { PageLayout, PagePaper } from "@/shared/components/layouts";
import { useNullableParamRef, useParamID } from "@/shared/composables";
import type { Nullable } from "@/shared/types/utility";
import { createPdfBlobFromBuffer } from "@/shared/utils/blob";
import { isNonNullable } from "@/shared/utils/equal";
import { mapNullable } from "@/shared/utils/functors";
import {
  useSummonTemplatePdf,
  ExportSummonTemplateDocxButton,
  FormingProtocolModal,
  HistorySummonTemplatesDrawer,
  ImportSummonTemplateModal,
  SummonsBackLink,
  SummonSubLinks,
  useFormingProtocolModal,
} from "@/features/summons";

const summonID = useParamID();
const summonTemplateName = useNullableParamRef("name");

const { isFetching, data, refetch } = useSummonTemplatePdf({
  summonID: summonID,
  summonTemplateName: summonTemplateName,
});

const pdfBlobURL = computed<Nullable<string>>(() =>
  mapNullable(data.value, (buffer) =>
    URL.createObjectURL(createPdfBlobFromBuffer(buffer))
  )
);

const {
  openedFormingModal,
  openFormingModal,
  closeFormingModal,
  redirectAfterSuccessForming,
} = useFormingProtocolModal();

const visibleHistoryDrawer = ref<boolean>(false);
const visibleImportModal = ref<boolean>(false);

const handleOpenHistoryDrawer = () => {
  visibleHistoryDrawer.value = true;
};

const handleCloseHistoryDrawer = () => {
  visibleHistoryDrawer.value = false;
};

const handleOpenImportModal = () => {
  visibleImportModal.value = true;
};

const handleCloseImportModal = () => {
  visibleImportModal.value = false;
};

const handleSuccessImport = () => {
  if (isNonNullable(summonTemplateName.value)) {
    summonTemplateName.value = null;
  } else {
    refetch.value();
  }
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
.stv__paper {
  display: flex;
  justify-content: center;
}

.stv__wrapper {
  width: 960px;
}

.stv__pdf {
  width: 100%;
}

.stv__actions {
  display: flex;
  gap: 10px;
}
</style>
