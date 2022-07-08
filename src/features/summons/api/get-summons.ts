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
import type { Summon } from "../types";

interface GetSummonsPayload {
  pagination: PaginationPayload;
  sort: SortPayload;
  filters: FiltersPayload;
}

interface SummonDto {
  id: number;
  name: string;
  type_summon: number;
  create_at: Date;
  meeting_at: Date;
}

const mapSummonFromDto = (summonDto: SummonDto): Summon => ({
  id: summonDto.id,
  name: summonDto.name,
  typeSummon: summonDto.type_summon,
  createAt: new Date(summonDto.create_at),
  meetingAt: new Date(summonDto.meeting_at),
});

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
