import { useQuery, type UseQueryReturnType } from "vue-query";

import type { PaginatedDto } from "@/lib/api";
import { getLogs, type Log } from "@/features/logs";

export const useLogs = (): UseQueryReturnType<PaginatedDto<Log>, unknown> =>
  useQuery({ queryKey: "logs", queryFn: getLogs });
