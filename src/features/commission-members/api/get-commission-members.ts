import { axios } from "@/lib/axios";
import { unwrapResultDto, type PaginatedDto, type ResultDto } from "@/lib/api";
import { IDENTITY_API_URL } from "@/shared/config";
import type { CommissionMember } from "@/features/commission-members";
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

interface GetCommissionMembersPayload {
  search: Nullable<string>;
}

interface GetCommissionMembersDto {
  search_name?: string;
}

const mapGetCommissionMembersToDto = (
  payload: GetCommissionMembersPayload
): GetCommissionMembersDto => ({
  ...(isNonNullable(payload.search) &&
    payload.search !== "" && {
      search_name: payload.search,
    }),
});

export const getCommissionMembers = (
  payload: GetCommissionMembersPayload
): Promise<PaginatedDto<CommissionMember>> =>
  axios
    .get<ResultDto<PaginatedDto<CommissionMember>>>(
      `${IDENTITY_API_URL}/api/v1/user/members_commission`,
      { params: mapGetCommissionMembersToDto(payload) }
    )
    .then(unwrapResultDto);
