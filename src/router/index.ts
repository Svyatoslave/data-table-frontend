import { createRouter, createWebHistory } from "vue-router";

import ApplicationFormsView from "@/features/application-forms/views/ApplicationFormsView.vue";
import {
  initialGuard,
  authenticationGuard,
  authorizationGuard,
} from "@/features/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth/login",
      name: "login",
      meta: { typeOfPublicity: "public" },
      component: () => import("@/features/auth/views/LoginView.vue"),
    },
    {
      path: "/application-forms",
      name: "applicationForms",
      meta: {
        typeOfPublicity: "private",
        allowedRoles: ["SecretaryCommission"],
      },
      component: ApplicationFormsView,
    },
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
      path: "/protocols",
      name: "protocols",
      meta: {
        typeOfPublicity: "private",
        allowedRoles: ["SecretaryCommission", "MemberCommission"],
      },
      component: () => import("@/features/protocols/views/ProtocolsView.vue"),
    },
    {
      path: "/users",
      name: "users",
      meta: {
        typeOfPublicity: "private",
        allowedRoles: ["Admin"],
      },
      component: () => import("@/features/users/views/UsersView.vue"),
    },
    {
      path: "/logs",
      name: "logs",
      meta: { typeOfPublicity: "private", allowedRoles: ["Admin"] },
      component: () => import("@/features/logs/views/LogsView.vue"),
    },
  ],
  linkActiveClass: "active-link",
  linkExactActiveClass: "exact-active-link",
});

router.beforeEach(initialGuard);
router.beforeEach(authenticationGuard);
router.beforeEach(authorizationGuard);

export default router;
