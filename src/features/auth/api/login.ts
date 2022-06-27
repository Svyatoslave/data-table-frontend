import { axios } from "@/lib/axios";

import type { AuthUser } from "@/features/auth/types";

export interface LoginCredentialsDTO {
  login: string;
  password: string;
}

export const login = (data: LoginCredentialsDTO): Promise<AuthUser> =>
  axios.post("/auth/login", data);
