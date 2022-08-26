import type { RouteMeta } from "vue-router";

import router from "@/router";
import type { UserRoleName } from "@/features/users";
import {
  KEYCLOAK_API_URL,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_KC_IDP_HINT,
  KEYCLOAK_SCOPE,
} from "@/shared/config";
import type { Nullable } from "@/shared/types/utility";

export const getDefaultRouteByRole = (role: UserRoleName): string => {
  switch (role) {
    case "SecretaryCommission":
      return "/application-forms";
    case "MemberCommission":
      return "/summons";
    case "Admin":
      return "/users";
    default:
      throw new Error("role don't match");
  }
};

interface Route {
  meta: RouteMeta;
}

export const isPublicRoute = (route: Route): boolean =>
  route.meta.typeOfPublicity === "public";

export const isPrivateRoute = (route: Route): boolean =>
  route.meta.typeOfPublicity === "private";

export const isSharedRoute = (route: Route): boolean =>
  route.meta.typeOfPublicity === "shared";

type RedirectedHttpStatus = 401 | 403 | 404 | 500;

export const isRedirectedHttpStatus = (
  status: number
): status is RedirectedHttpStatus => {
  switch (status) {
    case 401:
    case 403:
    case 404:
    case 500:
      return true;
    default:
      return false;
  }
};

export const relocateByHttpStatus = (status: RedirectedHttpStatus) => {
  const getPath = (): string => {
    switch (status) {
      case 401:
        return "/errors/401";
      case 403:
        return "/errors/403";
      case 404:
        return "/errors/404";
      case 500:
        return "/errors/500";
    }
  };

  router.push(getPath());
};

export const createKeycloakLink = (): string => {
  const url = new URL(
    `${KEYCLOAK_API_URL}/auth/realms/master/protocol/openid-connect/auth`
  );

  url.searchParams.set("client_id", KEYCLOAK_CLIENT_ID);
  url.searchParams.set("response_mode", "fragment");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("kc_idp_hint", KEYCLOAK_KC_IDP_HINT);
  url.searchParams.set("scope", KEYCLOAK_SCOPE);

  return url.toString();
};

export const getCodeFromSearchParams = (): Nullable<string> =>
  new URLSearchParams(window.location.hash).get("code");
