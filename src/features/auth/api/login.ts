import { axios } from "@/lib/axios";

import { IDENTITY_API_URL } from "@/shared/config";

export interface LoginCredentialsPayload {
  login: string;
  password: string;
}

export const login = (payload: LoginCredentialsPayload): Promise<void> =>
  axios.post<LoginCredentialsPayload, void>(
    `${IDENTITY_API_URL}/api/user/auth/login`,
    payload
  );
