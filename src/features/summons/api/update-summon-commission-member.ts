import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";

export interface UpdateSummonCommissionMemberPayload {
  summonID: string;
  commissionMemberIds: string[];
}

interface UpdateCommissionMemberAtDto {
  member_commission_ids: string[];
}

const mapUpdateSummonCommissionMemberAtToDto = (
  payload: UpdateSummonCommissionMemberPayload
): UpdateCommissionMemberAtDto => ({
  member_commission_ids: payload.commissionMemberIds,
});

export const updateSummonCommissionMember = (
  payload: UpdateSummonCommissionMemberPayload
): Promise<void> =>
  axios.put<UpdateCommissionMemberAtDto, void>(
    `${PROTOCOLS_API_URL}/api/v1/summons/${payload.summonID}/members_commission`,
    mapUpdateSummonCommissionMemberAtToDto(payload)
  );
