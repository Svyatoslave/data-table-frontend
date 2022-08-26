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
import { isNonNullable } from "@/shared/utils/equal";
import type { User } from "@/features/users";
import {
  getCodeFromSearchParams,
  getDefaultRouteByRole,
  InitialSpin,
} from "@/features/auth";

const router = useRouter();
const authStore = useAuthStore();
const { isUnknown, isUnauthenticated, callbackRoute, user } =
  storeToRefs(authStore);
const { loadUser, loadUserFromEsia } = authStore;

const code = getCodeFromSearchParams();

onMounted(() => {
  if (isNonNullable(code)) {
    loadUserFromEsia(code);
  } else {
    loadUser();
  }
});

const onAlterLoadUser = async () => {
  const nonRouteNow =
    !isDefined(callbackRoute) || !router.hasRoute(callbackRoute.value.name);

  switch (true) {
    case isUnauthenticated.value:
      await router.replace("/auth/login");
      break;
    case !nonRouteNow:
      await router.replace(callbackRoute.value?.fullPath as string);
      break;
    case nonRouteNow:
      await router.replace(
        getDefaultRouteByRole((user.value as User).role.name)
      );
      break;
  }
};

authStore.$onAction(({ name, after }) => {
  switch (name) {
    case "loadUser":
    case "loadUserFromEsia":
      after(onAlterLoadUser);
  }
});
</script>
