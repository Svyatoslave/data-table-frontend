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
import type { Nullable } from "@/shared/types/utility";
import type { ApplicationForm } from "@/features/application-forms";

interface GetApplicationFormsPayload {
  pagination: PaginationPayload;
  sort: SortPayload;
  filters: FiltersPayload;
}

interface ApplicationFormDto {
  id: number;
  type_application_form_text: string;
  complainant: string;
  created_at: string;
  summary_info: Nullable<string>;
}

const mapApplicationFormFromDto = (
  applicationFormDto: ApplicationFormDto
): ApplicationForm => ({
  id: applicationFormDto.id,
  typeApplicationFormText: applicationFormDto.type_application_form_text,
  complainant: applicationFormDto.complainant,
  createdAt: new Date(applicationFormDto.created_at),
  summaryInfo: applicationFormDto.summary_info,
});

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
