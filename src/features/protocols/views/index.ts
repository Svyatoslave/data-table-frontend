import type { RouteRecordRaw } from "vue-router";

export const protocolsRoutes: RouteRecordRaw[] = [
  {
    path: "/protocols",
    name: "protocols",
    meta: {
      typeOfPublicity: "private",
      allowedRoles: ["SecretaryCommission", "MemberCommission"],
    },
    component: () => import("@/features/protocols/views/ProtocolsView.vue"),
  },
];
