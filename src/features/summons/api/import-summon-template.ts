import { axios } from "@/lib/axios";
import { FILE_SERVICE_API_URL } from "@/shared/config";

export interface ImportSummonTemplatePayload {
  summonID: string;
  file: File;
}

interface ImportSummonTemplateParamsDto {
  Id: string;
}

const mapToImportSummonTemplateParamsDto = (
  payload: ImportSummonTemplatePayload
): ImportSummonTemplateParamsDto => ({
  Id: payload.summonID,
});

type ImportSummonTemplateBodyDto = FormData;

const mapToImportSummonTemplateBodyDto = (
  payload: ImportSummonTemplatePayload
): ImportSummonTemplateBodyDto => {
  const formData = new FormData();

  formData.append("file", payload.file);

  return formData;
};

export const importSummonTemplate = (
  payload: ImportSummonTemplatePayload
): Promise<void> =>
  axios.post<ImportSummonTemplateBodyDto, void>(
    `${FILE_SERVICE_API_URL}/api/v1/summons/template/import`,
    mapToImportSummonTemplateBodyDto(payload),
    {
      params: mapToImportSummonTemplateParamsDto(payload),
    }
  );
