import type { UseQueryReturnType } from "vue-query";

import { dayjs } from "@/lib/day-js";
import type { PaginatedDto } from "@/lib/api";
import {
  useFilterable,
  useProvideFilterable,
  useProvideSortable,
  useSortable,
  type GetRowKeyFn,
  type TableColumns,
} from "@/shared/components/data-display";
import {
  getApplicationFormTypes,
  type ApplicationForm,
} from "@/features/application-forms";
import { useSummonApplicationForms } from "./use-summon-application-forms";
import { usePagination, type UsePaginationReturn } from "@/shared/composables";

const columns: TableColumns<ApplicationForm> = [
  {
    key: "id",
    type: "standard",
    field: "id",
    headerName: "ID",
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

export interface UseSummonApplicationFormsTableOptions {
  summonID: string;
}

export interface UseSummonApplicationFormsTableReturn {
  columns: TableColumns<ApplicationForm>;
  pagination: UsePaginationReturn;
  summonApplicationFormsQuery: UseQueryReturnType<
    PaginatedDto<ApplicationForm>,
    unknown
  >;
  getRowKey: GetRowKeyFn<ApplicationForm>;
}

export const useSummonApplicationFormsTable = (
  options: UseSummonApplicationFormsTableOptions
): UseSummonApplicationFormsTableReturn => {
  const pagination = usePagination();

  const filterable = useFilterable({
    onChange: () => {
      pagination.resetPagination();
    },
  });
  useProvideFilterable(filterable);

  const sortable = useSortable({
    onChange: () => {
      pagination.resetPagination();
    },
  });
  useProvideSortable(sortable);

  const summonApplicationFormsQuery = useSummonApplicationForms({
    summonID: options.summonID,
    pagination: { page: pagination.page.value },
    sort: sortable.sort,
    filters: filterable.filters.value,
    onSuccess: (data) => {
      pagination.total.value = data.total;
    },
  });

  const getRowKey: GetRowKeyFn<ApplicationForm> = (row) => row.id;

  return {
    columns,
    pagination,
    summonApplicationFormsQuery,
    getRowKey,
  };
};
