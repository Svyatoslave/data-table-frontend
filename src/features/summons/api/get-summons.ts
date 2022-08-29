import {
  mapFiltersToDto,
  mapPaginatedDto,
  mapPaginationToDto,
  mapSortToDto,
  unwrapResultDto,
  type FiltersPayload,
  type PaginatedDto,
  type PaginationPayload,
  type ResultDto,
  type SortPayload,
} from "@/lib/api";
import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";
import {
  mapSummonFromDto,
  type Summon,
  type SummonDto,
} from "@/features/summons";

interface GetSummonsPayload {
  pagination: PaginationPayload;
  sort: SortPayload;
  filters: FiltersPayload;
}

export const getSummons = (
  payload: GetSummonsPayload
): Promise<PaginatedDto<Summon>> =>
  axios
    .get<ResultDto<PaginatedDto<SummonDto>>>(
      `${PROTOCOLS_API_URL}/api/v1/summons`,
      {
        params: {
          ...mapPaginationToDto(payload.pagination),
          ...mapSortToDto(payload.sort),
          ...mapFiltersToDto(payload.filters),
        },
      }
    )
    .then(unwrapResultDto)
    .then((data) => mapPaginatedDto(data, (item) => mapSummonFromDto(item)));
