import { createRouter, createWebHistory } from "vue-router";

import { applicationFormsRoutes } from "@/features/application-forms";
import {
  initialGuard,
  authenticationGuard,
  authorizationGuard,
  authRoutes,
  notFoundGuard,
} from "@/features/auth";
import { errorsRoutes } from "@/features/errors";
import { logsRoutes } from "@/features/logs";
import { protocolsRoutes } from "@/features/protocols";
import { summonsRoutes } from "@/features/summons";
import { usersRoutes } from "@/features/users";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...applicationFormsRoutes,
    ...authRoutes,
    ...errorsRoutes,
    ...logsRoutes,
    ...protocolsRoutes,
    ...summonsRoutes,
    ...usersRoutes,
  ],
});

router.beforeEach(initialGuard);
router.beforeEach(notFoundGuard);
router.beforeEach(authenticationGuard);
router.beforeEach(authorizationGuard);

export default router;
