<template>
  <Head>
    <title>{{ createHeadTitle("Повестки") }}</title>
  </Head>
  <PageLayout>
    <template #header>
      <div class="summons-view__header">
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
        <template #selection="{ disabled, row }: TableRowCtx<Summon>">
          <div class="summons-view__row-selection">
            <span>{{ row.id }}</span>
            <RouterLink
              custom
              :to="`/summons/${row.id}/application-forms`"
              v-slot="{ navigate }"
            >
              <LinkIcon :disabled="disabled" @click="navigate" />
            </RouterLink>
          </div>
        </template>
      </TableBody>
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
          text="Показаны повестки"
          :page="page"
          :page-size="pageSize"
          :total="total"
        />
      </template>
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type TableRowCtx,
} from "@/shared/components/data-display";
import {
  PageLayout,
  ContentContainer,
  SidebarFiller,
} from "@/shared/components/layouts";
import { LinkIcon } from "@/shared/components/icons";
import { isNonNullable } from "@/shared/utils/equal";
import { usePagination } from "@/shared/composables";
import { getApplicationFormTypes } from "@/features/application-forms";
import { getSummons, type Summon } from "@/features/summons";

const columns: TableColumns<Summon> = [
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
      tooltiped: false,
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
    tooltipOptions: {
      tooltiped: false,
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
    tooltipOptions: {
      tooltiped: false,
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
    tooltipOptions: {
      tooltiped: false,
    },
  },
];

const getRowKey: GetRowKeyFn<Summon> = (row) => row.id;

const { total, page, pageSize, resetPagination } = usePagination();

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
.summons-view__header {
  display: flex;
}

.summons-view__row-selection {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
