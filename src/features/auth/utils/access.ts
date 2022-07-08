import type { User, UserRoleName } from "@/features/users";

export const checkAccess = (
  user: User,
  allowedRoles: UserRoleName[]
): boolean => {
  return allowedRoles.includes(user.role.name);
};
