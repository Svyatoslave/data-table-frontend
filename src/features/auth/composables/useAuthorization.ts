import { storeToRefs } from "pinia";

import type { UserRoleName } from "@/features/users";
import { checkAccess as checkAccessUtil } from "@/features/auth";
import { useAuthStore } from "@/stores/auth";
import { isNonNullable } from "@/shared/utils/equal";

interface CheckAccessOptions {
  allowedRoles: UserRoleName[];
}

interface UseAuthorizationReturn {
  checkAccess: (options: CheckAccessOptions) => boolean;
}

export const useAuthorization = (): UseAuthorizationReturn => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  const checkAccess = (options: CheckAccessOptions): boolean => {
    if (!isNonNullable(user.value)) {
      return false;
    }

    return checkAccessUtil(user.value, options.allowedRoles);
  };

  return { checkAccess };
};
