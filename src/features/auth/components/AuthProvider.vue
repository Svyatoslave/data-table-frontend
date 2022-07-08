<template>
  <InitialSpin v-if="isUnknown" />
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { isDefined } from "@vueuse/core";
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";
import type { User } from "@/features/users";
import {
  checkAccess,
  getDefaultRouteByRole,
  InitialSpin,
  isPrivateRoute,
} from "@/features/auth";

const router = useRouter();
const authStore = useAuthStore();
const { isUnknown, isAuthenticated, isUnauthenticated, callbackRoute, user } =
  storeToRefs(authStore);
const { loadUser } = authStore;

onMounted(() => {
  loadUser();
});

const onAlterLoadUser = async () => {
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
    case isUnauthenticated.value:
      await router.replace("/auth/login");
      break;
    case isAuthenticated.value &&
      !nonRouteNow &&
      isPrivateCallbackRoute &&
      canAccess:
      await router.replace(callbackRoute.value?.fullPath as string);
      break;
    default:
      await router.replace(
        getDefaultRouteByRole((user.value as User).role.name)
      );
      break;
  }
};

authStore.$onAction(({ name, after }) => {
  if (name === "loadUser") {
    after(onAlterLoadUser);
  }
});
</script>
