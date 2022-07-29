import { axios } from "@/lib/axios";
import { mapDateToDto } from "@/lib/api";
import { PROTOCOLS_API_URL } from "@/shared/config";

export interface UpdateSummonMeetingAtPayload {
  summonID: string;
  meetingAt: Date;
}

interface UpdateSummonMeetingAtDto {
  meeting_at: string;
}

const mapUpdateSummonMeetingAtToDto = (
  payload: UpdateSummonMeetingAtPayload
): UpdateSummonMeetingAtDto => ({
  meeting_at: mapDateToDto(payload.meetingAt),
});

export const updateSummonMeetingAt = (
  payload: UpdateSummonMeetingAtPayload
): Promise<void> =>
  axios.put<UpdateSummonMeetingAtDto, void>(
    `${PROTOCOLS_API_URL}/api/v1/summons/${payload.summonID}/meeting_at`,
    mapUpdateSummonMeetingAtToDto(payload)
  );
