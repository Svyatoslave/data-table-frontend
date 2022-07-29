<template>
  <SEO title="Заявки" />
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
        :is-disabled-row="isDisabledRow"
        :get-row-key="getRowKey"
        :get-tooltip-row="getTooltipRow"
      >
        <template #selection="{ disabled, row }: TableRowCtx<ApplicationForm>">
          <div class="aftv__row-selection">
            <ECheckbox
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
  <FormingSummonModal
    v-model:visible="visibleModal"
    :selected="selectable.selected"
    @success="handleSuccess"
  />
</template>

<script setup lang="ts">
import { useQuery } from "vue-query";
import { RouterLink } from "vue-router";

import { SEO } from "@/lib/meta";
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
  type IsDisabledRowFn,
} from "@/shared/components/data-display";
import {
  PageLayout,
  ContentContainer,
  SidebarFiller,
} from "@/shared/components/layouts";
import { isNonNullable } from "@/shared/utils/equal";
import {
  getApplicationForms,
  FormingSummonModal,
} from "@/features/application-forms";
import { LinkIcon } from "@/shared/components/icons";
import {
  applicationFormStatusOptions,
  isNonApplicationFormAccepted,
  displayApplicationFormStatus,
  getApplicationFormTypes,
  useApplicationFormSelectable,
  type ApplicationForm,
} from "@/features/application-forms";
import { usePagination } from "@/shared/composables";
import { displayNullableData } from "@/shared/utils/display";
import { displayDate } from "@/shared/utils/display";

const columns: TableColumns<ApplicationForm> = [
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
      сomputed: (row) =>
        isNonApplicationFormAccepted(row)
          ? "Данная заявка уже сформирована в повестку или протокол"
          : row.id,
    },
  },
  {
    key: "license",
    type: "standard",
    field: "numberLicense",
    headerName: "Номер лицензии",
    width: "147px",
    sortOptions: {
      sortable: true,
      sortField: "4",
    },
    filterOptions: {
      filterable: true,
      filterField: "searchNumberLicense",
      filterType: "common",
    },
    tooltipOptions: {
      tooltiped: true,
      сomputed: (row) => displayNullableData(row.numberLicense),
    },
  },
  {
    key: "type",
    type: "standard",
    field: "type",
    headerName: "Вид заявки",
    width: "382px",
    sortOptions: {
      sortable: true,
      sortField: "2",
    },
    filterOptions: {
      filterable: true,
      filterField: "typeApplicationForm",
      filterType: "multiSelect",
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
    type: "standard",
    field: "nameAreaNedr",
    headerName: "Наименование участка недр",
    width: "170px",
    sortOptions: {
      sortable: true,
      sortField: "5",
    },
    filterOptions: {
      filterable: true,
      filterField: "searchNameAreaNedr",
      filterType: "common",
    },
    tooltipOptions: {
      tooltiped: false,
    },
  },
  {
    key: "subject",
    type: "standard",
    field: "subjectRF",
    headerName: "Субьъект РФ",
    width: "147px",
    sortOptions: {
      sortable: true,
      sortField: "6",
    },
    filterOptions: {
      filterable: true,
      filterField: "searchSubjectRf",
      filterType: "common",
    },
    tooltipOptions: {
      tooltiped: true,
      сomputed: (row) => displayNullableData(row.subjectRF),
    },
  },
  {
    key: "complainant",
    type: "standard",
    field: "complainant",
    headerName: "Заявитель",
    width: "220px",
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
      sortField: "7",
    },
    filterOptions: {
      filterable: true,
      filterType: "dateRange",
      filterField: "date",
    },
    tooltipOptions: {
      tooltiped: true,
      сomputed: (row) => displayDate(row.createdAt),
    },
  },
  {
    key: "date",
    type: "сomputed",
    сomputed: (row) => displayApplicationFormStatus(row.status),
    headerName: "Статус",
    width: "170px",
    sortOptions: {
      sortable: true,
      sortField: "8",
    },
    filterOptions: {
      filterable: true,
      filterField: "statusApplicationForm",
      filterType: "multi-select",
      getOptions: () => Promise.resolve(applicationFormStatusOptions),
    },
    tooltipOptions: {
      tooltiped: false,
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

const { data, isFetching, refetch } = useQuery(
  [
    "application-forms",
    { page, sort: sortable.sort, filters: filterable.filters },
  ],
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

const isDisabledRow: IsDisabledRowFn<ApplicationForm> = (row) =>
  isNonSelectedType(row) ||
  (!nonSelected.value && isNonApplicationFormAccepted(row));

const getRowKey: GetRowKeyFn<ApplicationForm> = (row) => row.id;

const getTooltipRow: GetTooltipRowFn<ApplicationForm> = (row) =>
  !nonSelected.value && isNonApplicationFormAccepted(row)
    ? "Данная заявка уже сформирована в повестку или протокол"
    : isNonSelectedType(row)
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
