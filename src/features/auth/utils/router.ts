import type { UserRoleName } from "@/features/users";
import type { RouteMeta } from "vue-router";

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
