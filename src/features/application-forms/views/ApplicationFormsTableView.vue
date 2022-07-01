<template>
  <Head>
    <title>{{ createHeadTitle("Заявки") }}</title>
  </Head>
  <PageLayout>
    <template #header>
      <div class="aftv__header">
        <SidebarFiller />
        <ContentContainer>
          <TableHead :columns="columns" />
        </ContentContainer>
      </div>
    </template>
    <template #default>
      <LoadingOverlay :visible="isFetching" class="aftv__loading-overlay" />
      <TableBody
        :rows="data?.items"
        :columns="columns"
        :get-row-key="getRowKey"
      >
        <template #selection="{ id }: ApplicationFormRow">
          {{ id }}
        </template>
      </TableBody>
    </template>
    <template #footer>
      <template v-if="isNonNullable(total)">
        <EButton :disabled="true">Сформировать проект протокола</EButton>
        <EPagination
          :total="Math.ceil(total / offset)"
          :per-page="5"
          v-model:page="page"
        />
        <PaginationInfo
          text="Показаны заявки"
          :offset="offset"
          :window="page"
          :total="total"
        />
      </template>
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuery } from "vue-query";
import { Head } from "@vueuse/head";

import type { PaginatedDto } from "@/lib/api";
import { createHeadTitle } from "@/shared/utils/meta";
import {
  TableBody,
  TableHead,
  EPagination,
  PaginationInfo,
  type GetRowKeyFn,
  type TableColumns,
} from "@/shared/components/data-display";
import {
  PageLayout,
  ContentContainer,
  SidebarFiller,
} from "@/shared/components/layouts";
import { EButton } from "@/shared/components/inputs";
import { LoadingOverlay } from "@/shared/components/overlay";
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import { getApplicationForms } from "@/features/application-forms";

type ApplicationFormRow = {
  id: string;
  typeApplicationForm: string;
  complainant: string;
  createdAt: string;
};

const columns: TableColumns<ApplicationFormRow> = [
  {
    key: "id",
    type: "slot",
    headerName: "ID",
    slotName: "selection",
    width: "173px",
  },
  {
    key: "type",
    type: "standard",
    field: "typeApplicationForm",
    headerName: "Вид заявки",
    width: "858px",
  },
  {
    key: "applicant",
    type: "standard",
    field: "complainant",
    headerName: "Заявитель",
    width: "393px",
  },
  {
    key: "date",
    type: "date",
    field: "createdAt",
    headerName: "Дата и время",
    width: "151px",
  },
];

const getRowKey: GetRowKeyFn<ApplicationFormRow> = (row) => row.id;

const total = ref<Nullable<number>>(null);
const offset = 30;
const page = ref<number>(1);

const { data, isFetching } = useQuery<PaginatedDto<ApplicationFormRow>>(
  ["application-forms", { page }],
  () => getApplicationForms({ page: page.value }),
  {
    keepPreviousData: true,
    onSuccess: (data) => {
      total.value = data.total;
    },
  }
);
</script>

<style scoped>
.aftv__header {
  display: flex;
}

.aftv__loading-overlay {
  position: fixed;
  margin-top: var(--header-full-height);
  margin-left: var(--sidebar-width);
  margin-bottom: var(--footer-height);
}
</style>
