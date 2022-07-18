import logs from "@/mocks/logs.json";

import { mapPaginatedDto, type PaginatedDto } from "@/lib/api";
import { later } from "@/shared/utils/async";
import { mapLogFromDto, type Log, type LogDto } from "@/features/logs";

export const getLogs = (): Promise<PaginatedDto<Log>> =>
  later(500, logs as PaginatedDto<LogDto>).then((data) =>
    mapPaginatedDto(data, (item) => mapLogFromDto(item))
  );
