import { useQuery, type UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import { getProtocols, type Protocol } from "@/features/protocols";

export const useProtocols = (): UseQueryReturnType<
  PaginatedDto<Protocol>,
  unknown
> => useQuery({ queryKey: "protocols", queryFn: getProtocols });
