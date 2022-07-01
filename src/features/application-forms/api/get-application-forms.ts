import {
  mapPaginatedDto,
  unwrapResultDto,
  type PaginatedDto,
  type ResultDto,
} from "@/lib/api";
import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";
import type { Nullable } from "@/shared/types/utility";
import type { ApplicationForm } from "@/features/application-forms";

interface GetApplicationFormsPayload {
  page: number;
}

export const getApplicationForms = async (
  payload: GetApplicationFormsPayload
): Promise<PaginatedDto<ApplicationForm>> =>
  axios
    .get<ResultDto<PaginatedDto<ApplicationFormDto>>>(
      `${PROTOCOLS_API_URL}/api/v1/application_form`,
      {
        params: { NumberPages: payload.page },
      }
    )
    .then(unwrapResultDto)
    .then((data) =>
      mapPaginatedDto(data, (item) => mapToApplicationForm(item))
    );

interface ApplicationFormDto {
  id: string;
  type_application_form: string;
  complainant: string;
  created_at: string;
  summary_info: Nullable<string>;
}

const mapToApplicationForm = (
  applicationFormDto: ApplicationFormDto
): ApplicationForm => ({
  id: applicationFormDto.id,
  typeApplicationForm: applicationFormDto.type_application_form,
  complainant: applicationFormDto.complainant,
  createdAt: applicationFormDto.created_at,
  summaryInfo: applicationFormDto.summary_info,
});
