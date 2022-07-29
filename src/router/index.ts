import { createRouter, createWebHistory } from "vue-router";

import {
  initialGuard,
  authenticationGuard,
  authorizationGuard,
  authRoutes,
} from "@/features/auth";
import { applicationFormsRoutes } from "@/features/application-forms";
import { logsRoutes } from "@/features/logs";
import { protocolsRoutes } from "@/features/protocols";
import { summonsRoutes } from "@/features/summons";
import { usersRoutes } from "@/features/users";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...applicationFormsRoutes,
    ...summonsRoutes,
    ...protocolsRoutes,
    ...usersRoutes,
    ...logsRoutes,
  ],
});

router.beforeEach(initialGuard);
router.beforeEach(authenticationGuard);
router.beforeEach(authorizationGuard);

export default router;
