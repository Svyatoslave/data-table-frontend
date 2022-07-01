import { acceptHMRUpdate, defineStore } from "pinia";

import type { Nullable } from "@/shared/types/utility";
import type { User } from "@/features/users";
import {
  loadUser,
  login,
  refresh,
  isBeforeExpired,
  type LoginCredentialsPayload,
  parseExpired,
} from "@/features/auth";
import { storage } from "@/lib/storage";
import { isNonNullable } from "@/shared/utils/equal";

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
      const expired = storage.getExpired();
      if (!isNonNullable(expired)) {
        this.status = "unauthorized";

        return;
      }

      const parsedExpired = parseExpired(expired);

      console.log(parsedExpired);

      try {
        if (isBeforeExpired(parsedExpired)) {
          await refresh();
        }

        const user = await loadUser();
        this.$patch({
          user,
          status: "authorized",
        });
      } catch {
        this.status = "unauthorized";
      }

      // const getMe = async (): Promise<void> => {
      //   const user = await loadUser();
      //   this.$patch({
      //     user,
      //     status: "authorized",
      //   });
      // };

      // try {
      //   await getMe();
      // } catch {
      //   try {
      //     await refresh();
      //     await getMe();
      //   } catch {
      //     this.status = "unauthorized";
      //   }
      // }
    },
    async login(payload: LoginCredentialsPayload) {
      await login(payload);
      const user = await loadUser();

      this.$patch({
        user,
        status: "authorized",
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
