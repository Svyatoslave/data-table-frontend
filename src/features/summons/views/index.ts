import type { RouteRecordRaw } from "vue-router";

export const summonsRoutes: RouteRecordRaw[] = [
  {
    path: "/summons",
    name: "summons",
    meta: {
      typeOfPublicity: "private",
      allowedRoles: ["SecretaryCommission", "MemberCommission"],
    },
    component: () => import("@/features/summons/views/SummonsView.vue"),
  },
  {
    path: "/summons/:id/application-forms",
    name: "summonApplicationForm",
    meta: {
      typeOfPublicity: "private",
      allowedRoles: ["SecretaryCommission", "MemberCommission"],
    },
    component: () =>
      import("@/features/summons/views/SummonApplicationFormsView.vue"),
  },
  {
    path: "/summons/:id/info",
    name: "summonInfo",
    meta: {
      typeOfPublicity: "private",
      allowedRoles: ["SecretaryCommission", "MemberCommission"],
    },
    component: () => import("@/features/summons/views/SummonInfoView.vue"),
  },
  {
    path: "/summons/:id/template/:name?",
    name: "summonTemplate",
    meta: {
      typeOfPublicity: "private",
      allowedRoles: ["SecretaryCommission", "MemberCommission"],
    },
    component: () => import("@/features/summons/views/SummonTemplateView.vue"),
  },
  {
    path: "/summons/:id/commission-members",
    name: "summonCommissionMembers",
    meta: {
      typeOfPublicity: "private",
      allowedRoles: ["SecretaryCommission", "MemberCommission"],
    },
    component: () =>
      import("@/features/summons/views/SummonCommissionMembersView.vue"),
  },
];
