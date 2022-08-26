import { axios } from "@/lib/axios";
import { FILE_SERVICE_API_URL } from "@/shared/config";
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

interface GetSummonTemplatePdfPayload {
  summonID: string;
  summonTemplateName: Nullable<string>;
}

interface GetSummonTemplatePdfParamsDto {
  Id: string;
  Name?: string;
}

const mapToGetSummonTemplatePdfParamsDto = (
  payload: GetSummonTemplatePdfPayload
): GetSummonTemplatePdfParamsDto => ({
  Id: payload.summonID,
  ...(isNonNullable(payload.summonTemplateName) && {
    Name: payload.summonTemplateName,
  }),
});

export const getSummonTemplatePdf = (
  payload: GetSummonTemplatePdfPayload
): Promise<ArrayBuffer> =>
  axios.get<ArrayBuffer>(`${FILE_SERVICE_API_URL}/api/v1/summons/template`, {
    responseType: "arraybuffer",
    params: mapToGetSummonTemplatePdfParamsDto(payload),
  });
