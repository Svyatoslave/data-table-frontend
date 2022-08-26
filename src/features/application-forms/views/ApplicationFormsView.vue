<template>
  <SEO title="Заявки" />
  <PageLayout>
    <template #header>
      <div class="aftv__header">
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
        :is-disabled-row="isDisabledRow"
        :get-row-key="getRowKey"
        :get-tooltip-row="getTooltipRow"
      >
        <template #selection="{ disabled, row }: TableRowCtx<ApplicationForm>">
          <div class="aftv__row-selection">
            <VCheckbox
              :disabled="disabled || isNonApplicationFormAccepted(row)"
              :checked="isSelected(row)"
              class="aftv__checkbox"
              @update:checked="changeSelectable(row)"
            />
            <span class="aftv__row-selection-id">{{ row.id }}</span>
            <RouterLink
              custom
              :to="`/application-forms/${row.id}/info`"
              v-slot="{ navigate }"
            >
              <LinkIcon
                :disabled="disabled"
                class="aftv__row-selection-icon"
                @click="navigate"
              />
            </RouterLink>
          </div>
        </template>
      </DataTableBody>
    </template>
    <template #footer>
      <VButton
        :disabled="nonSelected"
        variant="contained"
        color="secondary"
        @click="changeVisibleModal(true)"
      >
        Сформировать проект протокола
      </VButton>
      <template v-if="isNonNullable(total)">
        <VPagination
          v-model:page="page"
          :total="total"
          :page-size="pageSize"
          :per-page="5"
        />
        <VPaginationInfo
          text="Показаны заявки"
          :page="page"
          :page-size="pageSize"
          :total="total"
        />
      </template>
    </template>
  </PageLayout>
  <FormingSummonModal
    :visible="visibleModal"
    :selected="selectable.selected"
    @success="handleSuccess"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

import { SEO } from "@/lib/meta";
import { VButton, VCheckbox } from "@/shared/components/inputs";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type TableRowCtx,
  DataTableBody,
  DataTableHead,
  VPagination,
  VPaginationInfo,
} from "@/shared/components/data-display";
import { LinkIcon } from "@/shared/components/icons";
import {
  PageLayout,
  ContentContainer,
  PageSidebarFiller,
} from "@/shared/components/layouts";
import { isNonNullable } from "@/shared/utils/equal";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type ApplicationForm,
  FormingSummonModal,
  isNonApplicationFormAccepted,
  useApplicationFormsTable,
  useApplicationFormSelectable,
} from "@/features/application-forms";

const {
  selectable,
  nonSelected,
  visibleModal,
  isSelected,
  isNonSelectedType,
  changeVisibleModal,
  changeSelectable,
  clearSelected,
  closeModal,
} = useApplicationFormSelectable();

const {
  columns,
  pagination: { page, pageSize, total },
  applicationFormsQuery: { data, isFetching, refetch },
  isDisabledRow,
  getRowKey,
  getTooltipRow,
} = useApplicationFormsTable({
  nonSelected: nonSelected,
  isNonSelectedType: isNonSelectedType,
});

const handleSuccess = () => {
  clearSelected();
  refetch.value();
};
</script>

<style scoped>
.aftv__header {
  display: flex;
}

.aftv__row-selection {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aftv__row-selection-id {
  max-width: 78px;
  margin: 0 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.aftv__row-selection-icon {
  flex: 0 0 auto;
}
</style>
