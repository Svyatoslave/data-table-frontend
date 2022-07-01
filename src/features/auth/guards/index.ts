import type { RouteLocationNormalized, RouteLocationRaw } from "vue-router";

import { useAuthStore } from "@/stores/auth";

export const authGuard = (
  to: RouteLocationNormalized
): void | RouteLocationRaw | boolean => {
  const { isInitial, isAuthorized, isUnauthorized } = useAuthStore();

  switch (true) {
    case isInitial:
      return false;
    case to.meta.typeOfPublicity === "private" && isUnauthorized:
      return false;
    case to.meta.typeOfPublicity === "public" && isAuthorized:
      return false;
  }
};
