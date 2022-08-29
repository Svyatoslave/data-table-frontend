import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";

interface DeleteSummonPayload {
  summonID: string;
}

export const deleteSummon = (payload: DeleteSummonPayload): Promise<void> =>
  axios.delete<void>(`${PROTOCOLS_API_URL}/api/v1/summons/${payload.summonID}`);
