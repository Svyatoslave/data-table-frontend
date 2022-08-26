<template>
  <SEO title="Протоколы" />
  <PageLayout>
    <template #header>
      <div class="protocols-view__header">
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
      />
    </template>
    <template #footer>
      <VButton color="secondary" @click="handleOpenModal">
        Согласовать и подписать ЭЦП
      </VButton>
      <template v-if="isNonNullable(total)">
        <VPagination
          v-model:page="page"
          :total="total"
          :page-size="pageSize"
          :per-page="5"
        />
        <VPaginationInfo
          text="Показаны повестки"
          :page="page"
          :page-size="pageSize"
          :total="total"
        />
      </template>
    </template>
  </PageLayout>
  <ChooseCertificateModal :visible="visibleModal" @close="handleCloseModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";

import { SEO } from "@/lib/meta";
import {
  DataTableBody,
  DataTableHead,
  VPagination,
  VPaginationInfo,
} from "@/shared/components/data-display";
import { VButton } from "@/shared/components/inputs";
import {
  PageLayout,
  ContentContainer,
  PageSidebarFiller,
} from "@/shared/components/layouts";
import { isNonNullable } from "@/shared/utils/equal";
import {
  useProtocolsTable,
  ChooseCertificateModal,
} from "@/features/protocols";

const {
  columns,
  pagination: { page, pageSize, total },
  protocolsQuery: { data, isFetching },
  getRowKey,
} = useProtocolsTable();

const visibleModal = ref<boolean>(false);

const handleOpenModal = () => {
  visibleModal.value = true;
};

const handleCloseModal = () => {
  visibleModal.value = false;
};
</script>

<style scoped>
.protocols-view__header {
  display: flex;
}
</style>
