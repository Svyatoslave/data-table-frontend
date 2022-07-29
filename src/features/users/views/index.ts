import type { RouteRecordRaw } from "vue-router";

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: "/users",
    name: "users",
    meta: {
      typeOfPublicity: "private",
      allowedRoles: ["Admin"],
    },
    component: () => import("@/features/users/views/UsersView.vue"),
  },
];
