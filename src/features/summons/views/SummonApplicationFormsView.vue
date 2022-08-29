<template>
  <SEO title="Заявки повестки" />
  <PageLayout>
    <template #header-actions>
      <SummonsBackLink />
    </template>
    <template #header>
      <SummonSubLinks :summon-id="summonID" />
      <VDivider />
      <div class="safv__header">
        <PageSidebarFiller />
        <ContentContainer>
          <DataTableHead :columns="columns" />
        </ContentContainer>
      </div>
    </template>
    <template #default>
      <DataTableBody
        :loading="isFetching"
        :rows="data?.items"
        :columns="columns"
        :get-row-key="getRowKey"
      >
        <template #selection="{ disabled, row }: TableRowCtx<ApplicationForm>">
          <div class="safv__row-selection">
            <span>{{ row.id }}</span>
            <RouterLink :to="`/application-forms/${row.id}/info`">
              <LinkIcon :disabled="disabled" />
            </RouterLink>
          </div>
        </template>
        <template #delete="{ row }: TableRowCtx<ApplicationForm>">
          <div>
            <TrashIcon
              :disabled="canDelete"
              @click="handleDeleteSummonApplicationForm(row.id)"
            />
          </div>
        </template>
      </DataTableBody>
    </template>
    <template #footer>
      <VButton color="secondary" @click="handleOpenFormingModal">
        Сформировать протокол
      </VButton>
      <template v-if="isNonNullable(total)">
        <VPagination
          v-model:page="page"
          :total="total"
          :page-size="pageSize"
          :per-page="5"
        />
        <VPaginationInfo
          text="Показаны заявки повестки"
          :page="page"
          :page-size="pageSize"
          :total="total"
        />
      </template>
    </template>
  </PageLayout>
  <FormingProtocolModal
    :visible="openedFormingModal"
    :summon-id="summonID"
    @close="handleCloseFormingModal"
    @success="handleSuccessForming"
  />
</template>

<script setup lang="ts">
import { SEO } from "@/lib/meta";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type TableRowCtx,
  DataTableBody,
  DataTableHead,
  VPagination,
  VPaginationInfo,
  VDivider,
} from "@/shared/components/data-display";
import { LinkIcon, TrashIcon } from "@/shared/components/icons";
import {
  PageLayout,
  ContentContainer,
  PageSidebarFiller,
} from "@/shared/components/layouts";
import { VButton } from "@/shared/components/inputs";
import { isNonNullable } from "@/shared/utils/equal";
import { useParamID } from "@/shared/composables";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ApplicationForm } from "@/features/application-forms";
import {
  FormingProtocolModal,
  SummonsBackLink,
  SummonSubLinks,
  useDeleteSummonApplicationFormModal,
  useFormingProtocolModal,
  useSummonApplicationFormsTable,
} from "@/features/summons";

const summonID = useParamID();

const {
  columns,
  pagination: { page, pageSize, total },
  summonApplicationFormsQuery: { data, isFetching, refetch },
  getRowKey,
} = useSummonApplicationFormsTable({
  summonID,
});

const { canDelete, deleteSummonApplicationForm } =
  useDeleteSummonApplicationFormModal({
    applicationFormCount: total,
    summonID: summonID,
    onSuccess: () => {
      refetch.value();
    },
  });

const {
  openedFormingModal,
  openFormingModal,
  closeFormingModal,
  redirectAfterSuccessForming,
} = useFormingProtocolModal();

const handleDeleteSummonApplicationForm = (applicationFormID: number) => {
  deleteSummonApplicationForm(String(applicationFormID));
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
.safv__header {
  display: flex;
}

.safv__row-selection {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
