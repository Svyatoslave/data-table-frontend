import { axios } from "@/lib/axios";
import { unwrapResultDto, type ResultDto } from "@/lib/api";
import { PROTOCOLS_API_URL } from "@/shared/config";

export interface FormingSummonPayload {
  commissionMembersIds: string[];
  applicationFormIds: number[];
}

interface FormingSummonDto {
  member_commission_ids: string[];
  application_form_ids: number[];
}

const mapFormingSummonToDto = (
  payload: FormingSummonPayload
): FormingSummonDto => ({
  member_commission_ids: payload.commissionMembersIds,
  application_form_ids: payload.applicationFormIds,
});

export const formingSummon = (payload: FormingSummonPayload): Promise<string> =>
  axios
    .post<FormingSummonDto, ResultDto<string>>(
      `${PROTOCOLS_API_URL}/api/v1/application_form/summons`,
      mapFormingSummonToDto(payload)
    )
    .then(unwrapResultDto);
