import { unwrapResultDto, type ResultDto } from "@/lib/api";
import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";
import type { CommissionMember } from "@/features/commission-members";
import type { Nullable } from "@/shared/types/utility";

interface GetSummonCommissionMembersPayload {
  summonID: Nullable<string>;
}

export const getSummonCommissionMembers = (
  payload: GetSummonCommissionMembersPayload
): Promise<CommissionMember> =>
  axios
    .get<ResultDto<CommissionMember>>(
      `${PROTOCOLS_API_URL}/api/v1/summons/${payload.summonID}/members_commission`
    )
    .then(unwrapResultDto);
