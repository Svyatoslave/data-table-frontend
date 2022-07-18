import protocols from "@/mocks/protocols.json";

import { mapPaginatedDto, type PaginatedDto } from "@/lib/api";
import { later } from "@/shared/utils/async";
import {
  mapProtocolFromDto,
  type Protocol,
  type ProtocolDto,
} from "@/features/protocols";

export const getProtocols = (): Promise<PaginatedDto<Protocol>> =>
  later(500, protocols as PaginatedDto<ProtocolDto>).then((data) =>
    mapPaginatedDto(data, (item) => mapProtocolFromDto(item))
  );
