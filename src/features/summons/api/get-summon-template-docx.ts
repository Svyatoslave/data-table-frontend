import { axios } from "@/lib/axios";
import { FILE_SERVICE_API_URL } from "@/shared/config";
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

interface GetSummonTemplateDocxPayload {
  summonID: string;
  summonTemplateName: Nullable<string>;
}

interface GetSummonTemplateDocxParamsDto {
  Id: string;
  Name?: string;
}

const mapToGetSummonTemplateDocxParamsDto = (
  payload: GetSummonTemplateDocxPayload
): GetSummonTemplateDocxParamsDto => ({
  Id: payload.summonID,
  ...(isNonNullable(payload.summonTemplateName) && {
    Name: payload.summonTemplateName,
  }),
});

export const getSummonTemplateDocx = (
  payload: GetSummonTemplateDocxPayload
): Promise<ArrayBuffer> =>
  axios.get<ArrayBuffer>(
    `${FILE_SERVICE_API_URL}/api/v1/summons/template/export`,
    {
      responseType: "arraybuffer",
      params: mapToGetSummonTemplateDocxParamsDto(payload),
    }
  );
