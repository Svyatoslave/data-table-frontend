import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";

interface DeleteSummonCommissionMemberPayload {
  summonID: string;
  commissionMemberID: string;
}

export const deleteSummonCommissionMember = (
  payload: DeleteSummonCommissionMemberPayload
): Promise<void> =>
  axios.delete<void>(
    `${PROTOCOLS_API_URL}/api/v1/summons/${payload.summonID}/${payload.commissionMemberID}`
  );
