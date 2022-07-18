<template>
  <Head>
    <title>{{ createHeadTitle("Вход") }}</title>
  </Head>
  <div class="login-view">
    <div class="login-view__wrapper">
      <div class="login-view__form-layout">
        <div class="login-view__header">
          <div class="login-view__logos">
            <RosnedraIcon :size="34" />
            <RosgeolfondIcon :size="34" />
          </div>
          <EDivider flex-item orientation="vertical" />
          <div class="login-view__title-block">
            <NH1 class="login-view__title">Рассмотрение комиссии</NH1>
            <NH3 class="login-view__subtitle">Версия 1.0</NH3>
          </div>
        </div>
        <EDivider flex-item />
        <LoginForm @success="onSuccess" />
      </div>
      <img
        src="@/assets/images/mountains.jpg"
        class="login-view__mountains"
        alt="mono-logo"
      />
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
import { RosnedraIcon, RosgeolfondIcon } from "@/shared/components/icons";
import { EDivider } from "@/shared/components/data-display";
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
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  background-color: #e9eff6;
}

.login-view__form-layout {
  margin: 0 auto;
  background-color: #ffffff;
  width: 525px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-view__header {
  display: flex;
  align-items: center;
  padding: 56px 56px 35px 56px;
  gap: 25px;
}

.login-view__logos {
  display: flex;
  gap: 20px;
}

.login-view__title-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.login-view__title {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #002855;
  margin: 0 0 10px;
}

.login-view__subtitle {
  margin: 0;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #5a79a6;
}
.login-view__mountains {
  min-width: 100%;
  max-height: 100vh;
  object-fit: cover;
}
</style>
