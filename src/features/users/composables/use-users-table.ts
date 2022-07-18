import type { UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import type {
  GetRowKeyFn,
  TableColumns,
} from "@/shared/components/data-display";
import {
  useUsers,
  displayUserRole,
  displayUserFullName,
  type User,
} from "@/features/users";

const columns: TableColumns<User> = [
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
    key: "fullName",
    type: "сomputed",
    сomputed: (row) => displayUserFullName(row),
    headerName: "ФИО",
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
    key: "role",
    type: "сomputed",
    сomputed: (row) => displayUserRole(row.role),
    headerName: "Роль",
    width: "240px",
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
    key: "organizationName",
    type: "standard",
    field: "organizationName",
    headerName: "Организация",
    width: "475px",
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
    key: "numberPhone",
    type: "standard",
    field: "numberPhone",
    headerName: "Номер телефона",
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
    key: "email",
    type: "standard",
    field: "email",
    headerName: "Email",
    width: "300px",
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

interface UseUsersTableReturn {
  columns: TableColumns<User>;
  usersQuery: UseQueryReturnType<PaginatedDto<User>, unknown>;
  getRowKey: GetRowKeyFn<User>;
}

export const useUsersTable = (): UseUsersTableReturn => {
  const usersQuery = useUsers();

  const getRowKey: GetRowKeyFn<User> = (row) => row.id;

  return {
    columns,
    usersQuery,
    getRowKey,
  };
};
