import type { RouteLocationNormalized, RouteLocationRaw } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { isNonNullable } from "@/shared/utils/equal";
import { checkAccess, isPrivateRoute, isPublicRoute } from "@/features/auth";

type GuardReturn = void | boolean | RouteLocationRaw;

export const initialGuard = (to: RouteLocationNormalized): GuardReturn => {
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

export const notFoundGuard = (to: RouteLocationNormalized): GuardReturn => {
  const { isUnknown, isAuthenticated } = useAuthStore();

  switch (true) {
    case isUnknown:
      return true;
    case isAuthenticated && !isNonNullable(to.name):
      return "/errors/404";
  }
};

export const authenticationGuard = (
  to: RouteLocationNormalized
): GuardReturn => {
  const { isAuthenticated, isUnauthenticated } = useAuthStore();

  switch (true) {
    case isUnauthenticated && isPrivateRoute(to):
      return "/errors/401";
    case isAuthenticated && isPublicRoute(to):
      return "/errors/403";
  }
};

export const authorizationGuard = (
  to: RouteLocationNormalized
): GuardReturn => {
  const { user } = useAuthStore();

  switch (true) {
    case !isNonNullable(to.meta.allowedRoles):
      return true;
    case !isNonNullable(user):
      return "/errors/401";
    case isNonNullable(to.meta.allowedRoles) &&
      isNonNullable(user) &&
      !checkAccess(user, to.meta.allowedRoles):
      return "/errors/403";
  }
};
