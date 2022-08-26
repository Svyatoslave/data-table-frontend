import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";

export interface FormingProtocolPayload {
  summonID: string;
}

export const formingProtocol = (
  payload: FormingProtocolPayload
): Promise<void> =>
  axios.post<void, void>(
    `${PROTOCOLS_API_URL}/api/v1/summons/${payload.summonID}`
  );
