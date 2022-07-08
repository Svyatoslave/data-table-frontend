import { storeToRefs } from "pinia";
import { isDefined } from "@vueuse/core";

import type { UserRole, UserRoleName } from "@/features/users";
import { checkAccess as checkAccessUtil } from "@/features/auth";
import { useAuthStore } from "@/stores/auth";

interface CheckAccessOptions {
  allowedRoles: UserRoleName[];
}

interface UseAuthorizationReturn {
  role: UserRole;
  checkAccess: (options: CheckAccessOptions) => boolean;
}

export const useAuthorization = (): UseAuthorizationReturn => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  if (!isDefined(user)) {
    throw Error("user does not exist from auth store");
  }

  const checkAccess = (options: CheckAccessOptions): boolean => {
    return checkAccessUtil(user.value, options.allowedRoles);
  };

  return { role: user.value.role, checkAccess };
};
