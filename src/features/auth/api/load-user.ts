import { axios } from "@/lib/axios";
import type { User } from "@/features/users";

export const loadUser = (): Promise<User> => axios.get("/auth/me");
