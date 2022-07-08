<template>
  <Head>
    <title>{{ createHeadTitle("Повестки") }}</title>
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
        :is-disabled-row="() => false"
      />
    </template>
    <template #footer>
      <div></div>
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
</template>

<script setup lang="ts">
import { useQuery } from "vue-query";
import { Head } from "@vueuse/head";

import { createHeadTitle } from "@/shared/utils/meta";
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
} from "@/shared/components/data-display";
import {
  PageLayout,
  ContentContainer,
  SidebarFiller,
} from "@/shared/components/layouts";
import { isNonNullable } from "@/shared/utils/equal";
import { getApplicationFormTypes } from "@/features/application-forms";
import { usePagination } from "@/shared/composables";
import type { Summon } from "../types";
import { getSummons } from "../api/get-summons";

const columns: TableColumns<Summon> = [
  {
    key: "id",
    type: "standard",
    field: "id",
    headerName: "ID",
    width: "150px",
    sortOptions: {
      sortable: true,
      sortField: "1",
    },
    filterOptions: {
      filterable: true,
      filterField: "searchId",
      filterType: "primitive",
    },
  },
  {
    key: "type",
    type: "standard",
    field: "name",
    headerName: "Тип процедуры",
    width: "1090px",
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
  },
  {
    key: "meetingAt",
    type: "date",
    field: "meetingAt",
    headerName: "Дата и время заседания",
    width: "170px",
    sortOptions: {
      sortable: true,
      sortField: "4",
    },
    filterOptions: {
      filterable: false,
    },
  },
  {
    key: "createAt",
    type: "date",
    field: "createAt",
    headerName: "Дата и время формирования",
    width: "170px",
    sortOptions: {
      sortable: true,
      sortField: "5",
    },
    filterOptions: {
      filterable: false,
    },
  },
];

const getRowKey: GetRowKeyFn<Summon> = (row) => row.id;

const { total, page, pageSize } = usePagination();

const filterable = useFilterable();
useProvideFilterable(filterable);

const sortable = useSortable();
useProvideSortable(sortable);

const queryKey = [
  "summons",
  { page, sort: sortable.sort, filters: filterable.filters },
];

const { data, isFetching } = useQuery(
  queryKey,
  () =>
    getSummons({
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
</style>
