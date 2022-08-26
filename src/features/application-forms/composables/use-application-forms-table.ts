import type { Ref } from "vue";
import type { UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import {
  type TableColumns,
  type GetRowKeyFn,
  type GetTooltipRowFn,
  type IsDisabledRowFn,
  useFilterable,
  useProvideFilterable,
  useProvideSortable,
  useSortable,
} from "@/shared/components/data-display";
import { type UsePaginationReturn, usePagination } from "@/shared/composables";
import { displayDate, displayNullableData } from "@/shared/utils/display";
import {
  type ApplicationForm,
  displayApplicationFormStatus,
  isNonApplicationFormAccepted,
  applicationFormStatusOptions,
  useApplicationForms,
  applicationFormTypeOptions,
} from "@/features/application-forms";

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
    headerName: "Тип процедуры",
    width: "382px",
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
      filterType: "multiSelect",
      getOptions: () => Promise.resolve(applicationFormStatusOptions),
    },
    tooltipOptions: {
      tooltiped: false,
    },
  },
];

export interface UseApplicationFormsTableOptions {
  nonSelected: Ref<boolean>;
  isNonSelectedType: (row: ApplicationForm) => boolean;
}

export interface UseApplicationFormsTableReturn {
  columns: TableColumns<ApplicationForm>;
  pagination: UsePaginationReturn;
  applicationFormsQuery: UseQueryReturnType<
    PaginatedDto<ApplicationForm>,
    unknown
  >;
  isDisabledRow: IsDisabledRowFn<ApplicationForm>;
  getRowKey: GetRowKeyFn<ApplicationForm>;
  getTooltipRow: GetTooltipRowFn<ApplicationForm>;
}

export const useApplicationFormsTable = (
  options: UseApplicationFormsTableOptions
): UseApplicationFormsTableReturn => {
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

  const applicationFormsQuery = useApplicationForms({
    keepPreviousData: true,
    page: pagination.page,
    sort: sortable.sort,
    filters: filterable.filters,
    onSuccess: (data) => {
      pagination.total.value = data.total;
    },
  });

  const isDisabledRow: IsDisabledRowFn<ApplicationForm> = (row) =>
    options.isNonSelectedType(row) ||
    (!options.nonSelected.value && isNonApplicationFormAccepted(row));

  const getRowKey: GetRowKeyFn<ApplicationForm> = (row) => row.id;

  const getTooltipRow: GetTooltipRowFn<ApplicationForm> = (row) =>
    !options.nonSelected.value && isNonApplicationFormAccepted(row)
      ? "Данная заявка уже сформирована в повестку или протокол"
      : options.isNonSelectedType(row)
      ? "Множественные операции возможны только с заявками одного вида"
      : null;

  return {
    columns,
    pagination,
    applicationFormsQuery,
    isDisabledRow,
    getRowKey,
    getTooltipRow,
  };
};
