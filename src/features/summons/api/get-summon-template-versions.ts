import { axios } from "@/lib/axios";
import {
  type PaginatedDto,
  mapPaginatedDto,
  unwrapResultDto,
  type ResultDto,
} from "@/lib/api";
import { FILE_SERVICE_API_URL } from "@/shared/config";
import type {
  SummonTemplateVersion,
  SummonTemplateVersionDto,
} from "@/features/summons";
import { mapSummonTemplateVersionFromDto } from "./dto/summon-template-version-dto";

interface GetSummonTemplateVersionsPayload {
  summonID: string;
}

export const getSummonTemplateVersions = (
  payload: GetSummonTemplateVersionsPayload
): Promise<PaginatedDto<SummonTemplateVersion>> =>
  axios
    .get<ResultDto<PaginatedDto<SummonTemplateVersionDto>>>(
      `${FILE_SERVICE_API_URL}/api/v1/summons/template/${payload.summonID}/versions`
    )
    .then(unwrapResultDto)
    .then((data) =>
      mapPaginatedDto(data, (item) => mapSummonTemplateVersionFromDto(item))
    );
