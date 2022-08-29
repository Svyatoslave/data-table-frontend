import type { UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import {
  useFilterable,
  useProvideFilterable,
  useProvideSortable,
  useSortable,
  type GetRowKeyFn,
  type TableColumns,
} from "@/shared/components/data-display";
import { type UsePaginationReturn, usePagination } from "@/shared/composables";
import { applicationFormTypeOptions } from "@/features/application-forms";
import { type Summon, useSummons } from "@/features/summons";

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
    width: "1030px",
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
      filterable: true,
      filterType: "dateRange",
      filterField: "dateMeeting",
    },
    tooltipOptions: {
      tooltiped: false,
    },
  },
  {
    key: "createdAt",
    type: "date",
    field: "createdAt",
    headerName: "Дата и время формирования",
    width: "170px",
    sortOptions: {
      sortable: true,
      sortField: "5",
    },
    filterOptions: {
      filterable: true,
      filterType: "dateRange",
      filterField: "dateCreate",
    },
    tooltipOptions: {
      tooltiped: false,
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

export interface UseSummonsTableReturn {
  columns: TableColumns<Summon>;
  pagination: UsePaginationReturn;
  summonsQuery: UseQueryReturnType<PaginatedDto<Summon>, unknown>;
  getRowKey: GetRowKeyFn<Summon>;
}

export const useSummonsTable = (): UseSummonsTableReturn => {
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

  const summonsQuery = useSummons({
    keepPreviousData: true,
    page: pagination.page,
    sort: sortable.sort,
    filters: filterable.filters,
    onSuccess: (data) => {
      pagination.total.value = data.total;
    },
  });

  const getRowKey: GetRowKeyFn<Summon> = (row) => row.id;

  return {
    columns,
    pagination,
    summonsQuery,
    getRowKey,
  };
};
