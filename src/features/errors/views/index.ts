import type { RouteRecordRaw } from "vue-router";

export { default as InternalClientError } from "@/features/errors/views/InternalClientError.vue";

export const errorsRoutes: RouteRecordRaw[] = [
  {
    path: "/errors/401",
    name: "unauthorizedError",
    meta: {
      typeOfPublicity: "shared",
    },
    component: () => import("@/features/errors/views/UnauthorizedError.vue"),
  },
  {
    path: "/errors/403",
    name: "forbiddenError",
    meta: {
      typeOfPublicity: "shared",
    },
    component: () => import("@/features/errors/views/ForbiddenError.vue"),
  },
  {
    path: "/errors/404",
    name: "notFoundError",
    meta: {
      typeOfPublicity: "shared",
    },
    component: () => import("@/features/errors/views/NotFoundError.vue"),
  },
  {
    path: "/errors/500",
    name: "internalServerError",
    meta: {
      typeOfPublicity: "shared",
    },
    component: () => import("@/features/errors/views/InternalServerError.vue"),
  },
];
