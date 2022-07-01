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
      <TableBody
        :loading="isFetching"
        :rows="data?.items"
        :columns="columns"
        :get-row-key="getRowKey"
      >
        <template #selection="row: ApplicationFormRow">
          <div class="aftv__row-selection">
            <span>{{ row.id }}</span>
            <LinkIcon @click="handleClickLink(row)" class="aftv__link-icon" />
          </div>
        </template>
      </TableBody>
    </template>
    <template #footer>
      <EButton :disabled="true">Сформировать проект протокола</EButton>
      <template v-if="isNonNullable(total)">
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
  <EModal title="Подробная информация о заявке" v-model:visible="visibleModal">
    <DetailApplicationFormModal :applicationForm="detailApplicationFormModal" />
  </EModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuery } from "vue-query";
import { Head } from "@vueuse/head";

import type { PaginatedDto } from "@/lib/api";
import { createHeadTitle } from "@/shared/utils/meta";
import { EButton } from "@/shared/components/inputs";
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
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import {
  getApplicationForms,
  DetailApplicationFormModal,
} from "@/features/application-forms";
import { LinkIcon } from "@/shared/components/icons";
import { EModal } from "@/shared/components/overlay";
import type { DetailApplicationForm } from "@/features/application-forms";

type ApplicationFormRow = {
  id: number;
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
    width: "100px",
  },
  {
    key: "type",
    type: "standard",
    field: "typeApplicationForm",
    headerName: "Вид заявки",
    width: "931px",
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

const visibleModal = ref<boolean>(false);
const detailApplicationFormModal = ref<Nullable<DetailApplicationForm>>(null);

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

const handleClickLink = (row: ApplicationFormRow) => {
  visibleModal.value = true;
  detailApplicationFormModal.value = {
    id: row.id,
    typeApplicationForm: row.typeApplicationForm,
  };
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

.aftv__link-icon {
  margin-left: 5px;
  flex-grow: 1;
}

.aftv__link-icon:hover {
  cursor: pointer;
}
</style>
