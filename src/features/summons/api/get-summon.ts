import { unwrapResultDto, type ResultDto } from "@/lib/api";
import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";
import {
  mapDetailSummonFromDto,
  type DetailSummon,
  type DetailSummonDto,
} from "@/features/summons";

interface GetSummonPayload {
  summonID: string;
}

export const getSummon = (payload: GetSummonPayload): Promise<DetailSummon> =>
  axios
    .get<ResultDto<DetailSummonDto>>(
      `${PROTOCOLS_API_URL}/api/v1/summons/${payload.summonID}`
    )
    .then(unwrapResultDto)
    .then((data) => mapDetailSummonFromDto(data));
