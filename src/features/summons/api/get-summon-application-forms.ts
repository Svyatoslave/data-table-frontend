import { axios } from "@/lib/axios";
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
import {
  mapApplicationFormFromDto,
  type ApplicationFormDto,
} from "@/features/application-forms";
import { PROTOCOLS_API_URL } from "@/shared/config";

interface GetSummonApplicationFormsPayload {
  summonID: string;
  pagination: PaginationPayload;
  sort: SortPayload;
  filters: FiltersPayload;
}

export const getSummonApplicationForms = (
  payload: GetSummonApplicationFormsPayload
) =>
  axios
    .get<ResultDto<PaginatedDto<ApplicationFormDto>>>(
      `${PROTOCOLS_API_URL}/api/v1/summons/${payload.summonID}/application_form`,
      {
        params: {
          ...mapPaginationToDto(payload.pagination),
          ...mapSortToDto(payload.sort),
          ...mapFiltersToDto(payload.filters),
        },
      }
    )
    .then(unwrapResultDto)
    .then((data) =>
      mapPaginatedDto(data, (item) => mapApplicationFormFromDto(item))
    );
