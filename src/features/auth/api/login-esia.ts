import { axios } from "@/lib/axios";

import { IDENTITY_API_URL } from "@/shared/config";

export interface LoginEsiaCredentialsPayload {
  token: string;
}

export const loginEsia = (
  payload: LoginEsiaCredentialsPayload
): Promise<void> =>
  axios.post(`${IDENTITY_API_URL}/api/user/auth/login/esia`, null, {
    headers: { Authorization: `Bearer ${payload.token}` },
  });
