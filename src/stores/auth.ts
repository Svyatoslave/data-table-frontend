import { acceptHMRUpdate, defineStore } from "pinia";

import { storage } from "@/lib/storage";
import type { Nullable } from "@/shared/types/utility";
import type { User } from "@/features/users";
import {
  loadUser,
  login,
  logout,
  type LoginCredentialsDTO,
} from "@/features/auth";

type AuthStatus = "initial" | "authorized" | "unauthorized";

interface AuthState {
  user: Nullable<User>;
  status: AuthStatus;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({ user: null, status: "initial" }),
  getters: {
    isInitial(): boolean {
      return this.status === "initial";
    },
    isAuthorized(): boolean {
      return this.status === "authorized";
    },
    isUnauthorized(): boolean {
      return this.status === "unauthorized";
    },
  },
  actions: {
    async loadUser() {
      const token = storage.getToken();
      if (token === null) {
        this.status = "unauthorized";
        return;
      }

      try {
        const user = await loadUser();
        this.$patch({
          user,
          status: "authorized",
        });
      } catch {
        storage.clearToken();
        this.status = "unauthorized";
      }
    },
    async login(dto: LoginCredentialsDTO) {
      const { user, token } = await login(dto);

      storage.setToken(token);
      this.$patch({
        user,
        status: "authorized",
      });
    },
    async logout() {
      await logout();

      storage.clearToken();
      this.$patch({
        user: null,
        status: "unauthorized",
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
