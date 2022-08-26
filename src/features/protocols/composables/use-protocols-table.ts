import type { UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import {
  type GetRowKeyFn,
  type TableColumns,
  useFilterable,
  useProvideFilterable,
  useProvideSortable,
  useSortable,
} from "@/shared/components/data-display";
import { usePagination, type UsePaginationReturn } from "@/shared/composables";
import {
  applicationFormTypeOptions,
  displayApplicationTypeStatus,
} from "@/features/application-forms";
import {
  type Protocol,
  useProtocols,
  protocolVotingStatusOptions,
  displayProtocolVotingStatus,
} from "@/features/protocols";

const columns: TableColumns<Protocol> = [
  {
    key: "id",
    type: "standard",
    field: "id",
    headerName: "№ протокола",
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
    tooltipOptions: {
      tooltiped: false,
    },
  },
  {
    key: "applicationForms",
    type: "сomputed",
    сomputed: (row) =>
      row.countApplicationForm === 1
        ? String(row.applicationFormIds[0])
        : `${row.countApplicationForm} заявок(ки)`,
    headerName: "Заявки",
    width: "147px",
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
  {
    key: "typeProcedure",
    type: "сomputed",
    сomputed: (row) => displayApplicationTypeStatus(row.typeProcedure),
    headerName: "Тип процедуры",
    width: "216px",
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
    key: "numberLicence",
    type: "standard",
    field: "numberLicence",
    headerName: "Номер лицензии",
    width: "150px",
    sortOptions: {
      sortable: true,
      sortField: "3",
    },
    filterOptions: {
      filterable: true,
      filterField: "searchNumberLicense",
      filterType: "common",
    },
    tooltipOptions: {
      tooltiped: false,
    },
  },
  {
    key: "nameArea",
    type: "standard",
    field: "nameArea",
    headerName: "Наименование участка",
    width: "250px",
    sortOptions: {
      sortable: true,
      sortField: "4",
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
    key: "subjectRf",
    type: "standard",
    field: "subjectRf",
    headerName: "Субъект РФ",
    width: "180px",
    sortOptions: {
      sortable: true,
      sortField: "5",
    },
    filterOptions: {
      filterable: true,
      filterField: "searchSubjectRf",
      filterType: "common",
    },
    tooltipOptions: {
      tooltiped: false,
    },
  },
  {
    key: "votingStatus",
    type: "сomputed",
    сomputed: (row) => displayProtocolVotingStatus(row.votingStatus),
    headerName: "Статус согласования",
    width: "149px",
    sortOptions: {
      sortable: false,
    },
    filterOptions: {
      filterable: true,
      filterField: "approvalStatus",
      filterType: "multiSelect",
      getOptions: () => Promise.resolve(protocolVotingStatusOptions),
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
    width: "160px",
    sortOptions: {
      sortable: true,
      sortField: "6",
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
    width: "160px",
    sortOptions: {
      sortable: true,
      sortField: "7",
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
];

interface UseProtocolsTableReturn {
  columns: TableColumns<Protocol>;
  pagination: UsePaginationReturn;
  protocolsQuery: UseQueryReturnType<PaginatedDto<Protocol>, unknown>;
  getRowKey: GetRowKeyFn<Protocol>;
}

export const useProtocolsTable = (): UseProtocolsTableReturn => {
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

  const protocolsQuery = useProtocols({
    keepPreviousData: true,
    page: pagination.page,
    sort: sortable.sort,
    filters: filterable.filters,
    onSuccess: (data) => {
      pagination.total.value = data.total;
    },
  });

  const getRowKey: GetRowKeyFn<Protocol> = (row) => row.id;

  return {
    columns,
    pagination,
    protocolsQuery,
    getRowKey,
  };
};
