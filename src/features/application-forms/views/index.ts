import type { RouteRecordRaw } from "vue-router";

export const applicationFormsRoutes: RouteRecordRaw[] = [
  {
    path: "/application-forms",
    name: "applicationForms",
    meta: {
      typeOfPublicity: "private",
      allowedRoles: ["SecretaryCommission"],
    },
    component: () =>
      import("@/features/application-forms/views/ApplicationFormsView.vue"),
  },
  {
    path: "/application-forms/:id/info",
    name: "applicationFormInfo",
    meta: {
      typeOfPublicity: "private",
      allowedRoles: ["SecretaryCommission"],
    },
    component: () =>
      import("@/features/application-forms/views/ApplicationFormInfoView.vue"),
  },
];
