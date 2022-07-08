import type { RouteLocationNormalized, RouteLocationRaw } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { isNonNullable } from "@/shared/utils/equal";
import { checkAccess, isPrivateRoute, isPublicRoute } from "@/features/auth";

export const initialGuard = (
  to: RouteLocationNormalized
): void | RouteLocationRaw | boolean => {
  const { isUnknown, setCalllbackRoute } = useAuthStore();

  if (!isUnknown) return true;

  if (isNonNullable(to.name)) {
    setCalllbackRoute({
      name: to.name as string,
      fullPath: to.fullPath,
      meta: to.meta,
    });
  }

  return false;
};

export const authenticationGuard = (
  to: RouteLocationNormalized
): void | RouteLocationRaw | boolean => {
  const { isAuthenticated, isUnauthenticated } = useAuthStore();

  switch (true) {
    case isUnauthenticated && isPrivateRoute(to):
      return false;
    case isAuthenticated && isPublicRoute(to):
      return false;
  }
};

export const authorizationGuard = (
  to: RouteLocationNormalized
): void | RouteLocationRaw | boolean => {
  const { user } = useAuthStore();

  if (!isNonNullable(to.meta.allowedRoles)) return true;
  if (!isNonNullable(user)) return false;

  switch (true) {
    case !checkAccess(user, to.meta.allowedRoles):
      return false;
  }
};
