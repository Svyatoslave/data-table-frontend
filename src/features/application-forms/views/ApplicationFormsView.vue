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
        :is-disabled-row="isNonSelectedType"
        :get-row-key="getRowKey"
        :get-tooltip-row="getTooltipRow"
      >
        <template #selection="{ disabled, row }: TableRowCtx<ApplicationForm>">
          <div class="aftv__row-selection">
            <ECheckbox
              :disabled="disabled"
              :checked="isSelected(row)"
              class="aftv__checkbox"
              @update:checked="changeSelectable(row)"
            />
            <span class="aftv__row-selection-id">{{ row.id }}</span>
            <LinkIcon
              :disabled="disabled"
              class="aftv__row-selection-icon"
              @click="selectDetailId(row)"
            />
          </div>
        </template>
      </TableBody>
    </template>
    <template #footer>
      <EButton
        :disabled="nonSelected"
        variant="contained"
        color="secondary"
        @click="changeVisibleModal(true)"
      >
        Сформировать проект протокола
      </EButton>
      <template v-if="isNonNullable(total)">
        <EPagination
          v-model:page="page"
          :total="total"
          :page-size="pageSize"
          :per-page="5"
        />
        <PaginationInfo
          text="Показаны заявки"
          :page="page"
          :page-size="pageSize"
          :total="total"
        />
      </template>
    </template>
  </PageLayout>
  <DetailApplicationFormModal
    :queryKey="queryKey"
    :detail-id="detailId"
    @clear-detail-id="clearDetailId"
  />
  <FormingSummonModal
    v-model:visible="visibleModal"
    :selected="selectable.selected"
    @success="handleSuccess"
  />
</template>

<script setup lang="ts">
import { useQuery } from "vue-query";
import { Head } from "@vueuse/head";

import { dayjs } from "@/lib/day-js";
import { createHeadTitle } from "@/shared/utils/meta";
import { EButton, ECheckbox } from "@/shared/components/inputs";
import {
  TableBody,
  TableHead,
  EPagination,
  PaginationInfo,
  useSortable,
  useProvideSortable,
  useFilterable,
  useProvideFilterable,
  type GetRowKeyFn,
  type TableColumns,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type TableRowCtx,
  type GetTooltipRowFn,
} from "@/shared/components/data-display";
import {
  PageLayout,
  ContentContainer,
  SidebarFiller,
} from "@/shared/components/layouts";
import { isNonNullable } from "@/shared/utils/equal";
import {
  getApplicationForms,
  DetailApplicationFormModal,
  FormingSummonModal,
  useApplicationFormDetail,
} from "@/features/application-forms";
import { LinkIcon } from "@/shared/components/icons";
import {
  getApplicationFormTypes,
  useApplicationFormSelectable,
  type ApplicationForm,
} from "@/features/application-forms";
import { usePagination } from "@/shared/composables";

export type ApplicationFormRow = {
  id: number;
  typeApplicationFormText: string;
  complainant: string;
  createdAt: Date;
};

const columns: TableColumns<ApplicationFormRow> = [
  {
    key: "id",
    type: "slot",
    headerName: "ID",
    slotName: "selection",
    width: "174px",
    sortOptions: {
      sortable: true,
      sortField: "1",
    },
    filterOptions: {
      filterable: true,
      filterField: "searchId",
      filterType: "primitive",
    },
    tooltipOptions: {
      tooltiped: true,
      сomputed: (row) => row.id,
    },
  },
  {
    key: "license",
    type: "сomputed",
    сomputed: () => "Нет данных",
    headerName: "Номер лицензии",
    width: "147px",
    sortOptions: {
      sortable: false,
    },
    filterOptions: {
      filterable: false,
    },
    tooltipOptions: {
      tooltiped: true,
      сomputed: () => "Нет данных",
    },
  },
  {
    key: "type",
    type: "standard",
    field: "typeApplicationFormText",
    headerName: "Вид заявки",
    width: "525px",
    sortOptions: {
      sortable: true,
      sortField: "2",
    },
    filterOptions: {
      filterable: true,
      filterField: "typeApplicationForm",
      filterType: "multi-select",
      getOptions: () =>
        getApplicationFormTypes().then((data) =>
          data.items.map(({ id, name }) => ({ value: id, label: name }))
        ),
    },
    tooltipOptions: {
      tooltiped: false,
    },
  },

  {
    key: "name",
    type: "сomputed",
    сomputed: () => "Нет данных",
    headerName: "Наименование участка недр",
    width: "147px",
    sortOptions: {
      sortable: false,
    },
    filterOptions: {
      filterable: false,
    },
    tooltipOptions: {
      tooltiped: true,
      сomputed: () => "Нет данных",
    },
  },
  {
    key: "subject",
    type: "сomputed",
    сomputed: () => "Нет данных",
    headerName: "Субьъект РФ",
    width: "147px",
    sortOptions: {
      sortable: false,
    },
    filterOptions: {
      filterable: false,
    },
    tooltipOptions: {
      tooltiped: true,
      сomputed: () => "Нет данных",
    },
  },
  {
    key: "complainant",
    type: "standard",
    field: "complainant",
    headerName: "Заявитель",
    width: "270px",
    sortOptions: {
      sortable: true,
      sortField: "3",
    },
    filterOptions: {
      filterable: true,
      filterField: "searchComplainant",
      filterType: "common",
    },
    tooltipOptions: {
      tooltiped: true,
      сomputed: (row) => row.complainant,
    },
  },
  {
    key: "date",
    type: "date",
    field: "createdAt",
    headerName: "Дата и время",
    width: "170px",
    sortOptions: {
      sortable: true,
      sortField: "4",
    },
    filterOptions: {
      filterable: false,
    },
    tooltipOptions: {
      tooltiped: true,
      сomputed: (row) => dayjs(row.createdAt).format("DD.MM.YY HH:mm"),
    },
  },
];

const { total, page, pageSize, resetPagination } = usePagination();

const {
  selectable,
  nonSelected,
  visibleModal,
  isSelected,
  isNonSelectedType,
  changeVisibleModal,
  changeSelectable,
  clearSelected,
} = useApplicationFormSelectable();

const { detailId, selectDetailId, clearDetailId } = useApplicationFormDetail();

const filterable = useFilterable({
  onChange: () => {
    resetPagination();
  },
});
useProvideFilterable(filterable);

const sortable = useSortable({
  onChange: () => {
    resetPagination();
  },
});
useProvideSortable(sortable);

const queryKey = [
  "application-forms",
  { page, sort: sortable.sort, filters: filterable.filters },
];

const { data, isFetching, refetch } = useQuery(
  queryKey,
  () =>
    getApplicationForms({
      pagination: { page: page.value },
      sort: sortable.sort,
      filters: filterable.filters.value,
    }),
  {
    keepPreviousData: true,
    onSuccess: (data) => {
      total.value = data.total;
    },
  }
);

const getRowKey: GetRowKeyFn<ApplicationForm> = (row) => row.id;

const getTooltipRow: GetTooltipRowFn<ApplicationForm> = (row) =>
  isNonSelectedType(row)
    ? "Множественные операции возможны только с заявками одного вида"
    : null;

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
