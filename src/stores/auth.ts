import type { RouteMeta } from "vue-router";
import { acceptHMRUpdate, defineStore } from "pinia";

import { storage } from "@/lib/storage";
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import { isDev } from "@/shared/config";
import type { User } from "@/features/users";
import {
  type LoginCredentialsPayload,
  loadUser,
  login,
  loginEsia,
  refresh,
  isBeforeExpired,
  parseExpired,
  logout,
  getKeycloakToken,
} from "@/features/auth";

type AuthenticationStatus = "unknown" | "authenticated" | "unauthenticated";

interface CalllbackRoute {
  name: string;
  fullPath: string;
  meta: RouteMeta;
}

interface AuthState {
  user: Nullable<User>;
  status: AuthenticationStatus;
  callbackRoute: Nullable<CalllbackRoute>;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    status: "unknown",
    callbackRoute: null,
  }),
  getters: {
    isUnknown: (state): boolean => state.status === "unknown",
    isAuthenticated: (state): boolean => state.status === "authenticated",
    isUnauthenticated: (state): boolean => state.status === "unauthenticated",
  },
  actions: {
    async loadUser() {
      if (isDev) {
        const getMe = async (): Promise<void> => {
          const user = await loadUser();
          this.$patch({
            user,
            status: "authenticated",
          });
        };

        try {
          await getMe();
        } catch {
          try {
            await refresh();
            await getMe();
          } catch {
            this.status = "unauthenticated";
          }
        }
      } else {
        const expired = storage.getExpired();
        if (!isNonNullable(expired)) {
          this.status = "unauthenticated";

          return;
        }

        const parsedExpired = parseExpired(expired);

        try {
          if (isBeforeExpired(parsedExpired)) {
            await refresh();
          }

          const user = await loadUser();
          this.$patch({
            user,
            status: "authenticated",
          });
        } catch {
          this.status = "unauthenticated";
        }
      }
    },
    async login(payload: LoginCredentialsPayload) {
      await login(payload);
      const user = await loadUser();

      this.$patch({
        user,
        status: "authenticated",
      });
    },
    async loadUserFromEsia(code: string) {
      const token = await getKeycloakToken({ code });
      await loginEsia({ token: token.accessToken });

      const user = await loadUser();

      this.$patch({
        user,
        status: "authenticated",
      });
    },
    async logout() {
      await logout();

      this.$patch({
        user: null,
        status: "unauthenticated",
        callbackRoute: null,
      });
    },
    setCalllbackRoute(route: CalllbackRoute) {
      this.callbackRoute = route;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
