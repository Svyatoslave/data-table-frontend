import type {
  GetRowKeyFn,
  TableColumns,
} from "@/shared/components/data-display";
import type { Protocol } from "@/features/protocols";
import { useProtocols } from "./use-protocols";
import type { PaginatedDto } from "@/lib/api";
import type { UseQueryReturnType } from "vue-query";

const columns: TableColumns<Protocol> = [
  {
    key: "protocolNumber",
    type: "standard",
    field: "protocolNumber",
    headerName: "№ протокола",
    width: "149px",
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
    key: "applicationForms",
    type: "standard",
    field: "applicationForms",
    headerName: "Заявки",
    width: "157px",
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
    key: "typeProtocol",
    type: "standard",
    field: "typeProtocol",
    headerName: "Тип процедуры",
    width: "707px",
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
    key: "approvalStatus",
    type: "standard",
    field: "approvalStatus",
    headerName: "Статус согласования",
    width: "220px",
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
    key: "meetingAt",
    type: "date",
    field: "meetingAt",
    headerName: "Дата и время заседания",
    width: "170px",
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
    key: "createdAt",
    type: "date",
    field: "createdAt",
    headerName: "Дата и время формирования",
    width: "170px",
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

interface UseProtocolsTableReturn {
  columns: TableColumns<Protocol>;
  protocolsQuery: UseQueryReturnType<PaginatedDto<Protocol>, unknown>;
  getRowKey: GetRowKeyFn<Protocol>;
}

export const UseProtocolsTable = (): UseProtocolsTableReturn => {
  const protocolsQuery = useProtocols();

  const getRowKey: GetRowKeyFn<Protocol> = (row) => row.protocolNumber;

  return {
    columns,
    protocolsQuery,
    getRowKey,
  };
};
