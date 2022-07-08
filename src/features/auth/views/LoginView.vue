<template>
  <Head>
    <title>{{ createHeadTitle("Вход") }}</title>
  </Head>
  <div class="login-view">
    <div class="login-view__wrapper">
      <div class="login-view__inner">
        <ETPIcon :size="75" />
        <NH1 class="login-view__title">Вход</NH1>
        <NH3 class="login-view__subtitle">Войдите в модуль "Коммисия"</NH3>
        <LoginForm @success="onSuccess" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Head } from "@vueuse/head";
import { isDefined } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { NH1, NH3 } from "naive-ui";

import { createHeadTitle } from "@/shared/utils/meta";
import { ETPIcon } from "@/shared/components/icons";
import {
  checkAccess,
  getDefaultRouteByRole,
  isPrivateRoute,
  LoginForm,
} from "@/features/auth";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/features/users";

const router = useRouter();

const authStore = useAuthStore();
const { callbackRoute, user } = storeToRefs(authStore);

const onSuccess = async () => {
  const nonRouteNow =
    !isDefined(callbackRoute) || !router.hasRoute(callbackRoute.value.name);

  const isPrivateCallbackRoute =
    !isDefined(callbackRoute) || isPrivateRoute(callbackRoute.value);

  const canAccess =
    isDefined(user.value) &&
    isDefined(callbackRoute.value) &&
    isDefined(callbackRoute.value.meta.allowedRoles) &&
    checkAccess(user.value, callbackRoute.value.meta.allowedRoles);

  switch (true) {
    case !nonRouteNow && isPrivateCallbackRoute && canAccess:
      await router.replace(callbackRoute.value?.fullPath as string);
      break;
    default:
      await router.replace(
        getDefaultRouteByRole((user.value as User).role.name)
      );
      break;
  }
};
</script>

<style scoped>
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-view__wrapper {
  width: 400px;
}

.login-view__inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.login-view__title {
  margin: 10px 0 0;
}

.login-view__subtitle {
  margin: 10px 0 20px;
  color: rgb(101, 116, 139);
}
</style>
