import { axios } from "@/lib/axios";
import { unwrapResultDto, type ResultDto } from "@/lib/api";
import { IDENTITY_API_URL } from "@/shared/config";
import type { User } from "@/features/users";

export const loadUser = (): Promise<User> =>
  axios
    .get<ResultDto<User>>(`${IDENTITY_API_URL}/api/user/me`)
    .then(unwrapResultDto);
