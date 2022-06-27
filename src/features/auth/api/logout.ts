import { axios } from "@/lib/axios";

export const logout = (): Promise<void> => axios.post("/auth/logout");
