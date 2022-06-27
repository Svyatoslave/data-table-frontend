import type { User } from "@/features/users";

export interface AuthUser {
  token: string;
  user: User;
}
