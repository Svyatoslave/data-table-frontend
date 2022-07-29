import type { RouteRecordRaw } from "vue-router";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth/login",
    name: "login",
    meta: { typeOfPublicity: "public" },
    component: () => import("@/features/auth/views/LoginView.vue"),
  },
];
