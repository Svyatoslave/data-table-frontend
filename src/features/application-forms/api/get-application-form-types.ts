import { axios } from "@/lib/axios";
import {
  mapPaginatedDto,
  unwrapResultDto,
  type PaginatedDto,
  type ResultDto,
} from "@/lib/api";
import { PROTOCOLS_API_URL } from "@/shared/config";
import type { ApplicationFormType } from "../types/type";

interface ApplicationFormTypeDto {
  id: number;
  name: string;
}

const mapApplicationFormTypeFromDto = (
  applicationFormTypeDto: ApplicationFormTypeDto
): ApplicationFormType => ({
  id: applicationFormTypeDto.id,
  name: applicationFormTypeDto.name,
});

export const getApplicationFormTypes = async (): Promise<
  PaginatedDto<ApplicationFormType>
> =>
  axios
    .get<ResultDto<PaginatedDto<ApplicationFormType>>>(
      `${PROTOCOLS_API_URL}/api/v1/application_form/type_application_form`
    )
    .then(unwrapResultDto)
    .then((data) =>
      mapPaginatedDto(data, (item) => mapApplicationFormTypeFromDto(item))
    );
