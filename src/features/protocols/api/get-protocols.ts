import {
  type ResultDto,
  type FiltersPayload,
  type PaginatedDto,
  type PaginationPayload,
  type SortPayload,
  mapPaginatedDto,
  mapFiltersToDto,
  mapPaginationToDto,
  mapSortToDto,
  unwrapResultDto,
} from "@/lib/api";
import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";
import {
  mapProtocolFromDto,
  type Protocol,
  type ProtocolDto,
} from "@/features/protocols";

interface GetProtocolsPayload {
  pagination: PaginationPayload;
  sort: SortPayload;
  filters: FiltersPayload;
}

export const getProtocols = (
  payload: GetProtocolsPayload
): Promise<PaginatedDto<Protocol>> =>
  axios
    .get<ResultDto<PaginatedDto<ProtocolDto>>>(
      `${PROTOCOLS_API_URL}/api/v1/protocols`,
      {
        params: {
          ...mapPaginationToDto(payload.pagination),
          ...mapSortToDto(payload.sort),
          ...mapFiltersToDto(payload.filters),
        },
      }
    )
    .then(unwrapResultDto)
    .then((data) => mapPaginatedDto(data, (dto) => mapProtocolFromDto(dto)));
