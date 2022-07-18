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
  mapApplicationFormFromDto,
  type ApplicationForm,
  type ApplicationFormDto,
} from "@/features/application-forms";

interface GetApplicationFormsPayload {
  pagination: PaginationPayload;
  sort: SortPayload;
  filters: FiltersPayload;
}

export const getApplicationForms = async (
  payload: GetApplicationFormsPayload
): Promise<PaginatedDto<ApplicationForm>> =>
  axios
    .get<ResultDto<PaginatedDto<ApplicationFormDto>>>(
      `${PROTOCOLS_API_URL}/api/v1/application_form`,
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
