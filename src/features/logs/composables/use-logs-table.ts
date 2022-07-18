import type { UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import type {
  GetRowKeyFn,
  TableColumns,
} from "@/shared/components/data-display";
import { useLogs, type Log } from "@/features/logs";
import { displayUserFullName } from "@/features/users";
import { displayLogAction } from "../utils/display";

const columns: TableColumns<Log> = [
  {
    key: "id",
    type: "standard",
    field: "id",
    headerName: "№",
    width: "109px",
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
    key: "object",
    type: "standard",
    field: "object",
    headerName: "Объект",
    width: "628px",
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
    key: "author",
    type: "сomputed",
    сomputed: (row) => displayUserFullName(row.author),
    headerName: "Автор",
    width: "270px",
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
    key: "action",
    type: "сomputed",
    сomputed: (row) => displayLogAction(row.action),
    headerName: "Действие",
    width: "160px",
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
    key: "date",
    type: "date",
    field: "date",
    headerName: "Дата и время",
    width: "180px",
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
    key: "ip",
    type: "standard",
    field: "ip",
    headerName: "IP",
    width: "247px",
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

interface UseLogsTableReturn {
  columns: TableColumns<Log>;
  logsQuery: UseQueryReturnType<PaginatedDto<Log>, unknown>;
  getRowKey: GetRowKeyFn<Log>;
}

export const UseLogsTable = (): UseLogsTableReturn => {
  const logsQuery = useLogs();

  const getRowKey: GetRowKeyFn<Log> = (row) => row.id;

  return {
    columns,
    logsQuery,
    getRowKey,
  };
};
