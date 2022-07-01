import { createRouter, createWebHistory } from "vue-router";

import ApplicationFormsView from "@/features/application-forms/views/ApplicationFormsTableView.vue";
import { authGuard } from "@/features/auth";

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
      meta: { typeOfPublicity: "private" },
      component: ApplicationFormsView,
    },
    {
      path: "/agendas",
      name: "agendas",
      meta: { typeOfPublicity: "private" },
      component: () => import("@/features/agendas/views/AgendasView.vue"),
    },
    {
      path: "/protocols",
      name: "protocols",
      meta: { typeOfPublicity: "private" },
      component: () => import("@/features/protocols/views/ProtocolsView.vue"),
    },
  ],
});

router.beforeEach(authGuard);

export default router;
