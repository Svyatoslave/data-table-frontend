import { createRouter, createWebHistory } from "vue-router";

import DashboardView from "@/views/DashboardView.vue";
import { authGuard } from "@/features/auth/guards";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      meta: { typeOfPublicity: "private" },
      component: DashboardView,
    },
    {
      path: "/auth/login",
      name: "login",
      meta: { typeOfPublicity: "public" },
      component: () => import("@/views/auth/LoginView.vue"),
    },
  ],
});

router.beforeEach(authGuard);

export default router;
