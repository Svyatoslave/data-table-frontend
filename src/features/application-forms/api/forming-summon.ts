import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";

export interface FormingSummonPayload {
  applicationFormIds: number[];
}

interface FormingSummonDto {
  application_form_ids: number[];
}

const mapFormingSummonToDto = (
  payload: FormingSummonPayload
): FormingSummonDto => ({
  application_form_ids: payload.applicationFormIds,
});

export const formingSummon = (payload: FormingSummonPayload): Promise<void> =>
  axios.post<FormingSummonDto, void>(
    `${PROTOCOLS_API_URL}/api/v1/application_form/summons`,
    mapFormingSummonToDto(payload)
  );
