import type { RouteRecordRaw } from "vue-router";

export const logsRoutes: RouteRecordRaw[] = [
  {
    path: "/logs",
    name: "logs",
    meta: { typeOfPublicity: "private", allowedRoles: ["Admin"] },
    component: () => import("@/features/logs/views/LogsView.vue"),
  },
];
