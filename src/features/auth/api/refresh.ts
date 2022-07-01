import { axios } from "@/lib/axios";
import { IDENTITY_API_URL } from "@/shared/config";

export const refresh = (): Promise<void> =>
  axios.post<void, void>(`${IDENTITY_API_URL}/api/user/auth/refresh`);
