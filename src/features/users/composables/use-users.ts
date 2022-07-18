import { useQuery, type UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import { getUsers, type User } from "@/features/users";

export const useUsers = (): UseQueryReturnType<PaginatedDto<User>, unknown> =>
  useQuery({ queryKey: "users", queryFn: getUsers });
