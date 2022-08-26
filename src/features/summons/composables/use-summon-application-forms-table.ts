import type { UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import { usePagination, type UsePaginationReturn } from "@/shared/composables";
import { displayNullableData } from "@/shared/utils/display";
import {
  useFilterable,
  useProvideFilterable,
  useProvideSortable,
  useSortable,
  type GetRowKeyFn,
  type TableColumns,
} from "@/shared/components/data-display";
import {
  type ApplicationForm,
  applicationFormTypeOptions,
} from "@/features/application-forms";
import { useSummonApplicationForms } from "@/features/summons";
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
      сomputed: (row) => row.id,
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
    headerName: "Тип процедуры",
    width: "390px",
    sortOptions: {
      sortable: true,
      sortField: "2",
    },
    filterOptions: {
      filterable: true,
      filterField: "typeApplicationForm",
      filterType: "multiSelect",
      getOptions: () => Promise.resolve(applicationFormTypeOptions),
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
    width: "222px",
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
      tooltiped: true,
      сomputed: (row) => displayNullableData(row.nameAreaNedr),
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
      sortable: false,
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
    key: "delete",
    type: "slot",
    slotName: "delete",
    headerName: "",
    width: "60px",
    sortOptions: {
      sortable: false,
    },
    filterOptions: {
      filterable: false,
    },
    tooltipOptions: {
      tooltiped: false,
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
    page: pagination.page,
    filters: filterable.filters,
    sort: sortable.sort,
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
