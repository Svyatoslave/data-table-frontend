import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";

interface DeleteSummonApplicationFormPayload {
  summonID: string;
  applicationFormID: string;
}

export const deleteSummonApplicationForm = (
  payload: DeleteSummonApplicationFormPayload
): Promise<void> =>
  axios.delete<void>(
    `${PROTOCOLS_API_URL}/api/v1/summons/${payload.summonID}/application_form/${payload.applicationFormID}`
  );
