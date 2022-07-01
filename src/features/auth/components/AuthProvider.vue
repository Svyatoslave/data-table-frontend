<template>
  <InitialSpin v-if="isInitial" />
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { InitialSpin } from "@/features/auth";
import { useAuthStore } from "@/stores/auth";
import { isNonNullable } from "@/shared/utils/equal";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { isInitial, isAuthorized, isUnauthorized } = storeToRefs(authStore);
const { loadUser } = authStore;

onMounted(() => {
  loadUser();
});

const onAlterLoadUser = async () => {
  const nonRouteNow =
    !isNonNullable(route.name) || !router.hasRoute(route.name);

  switch (true) {
    case isUnauthorized.value:
      {
        await router.replace("/auth/login");
      }
      break;
    case isAuthorized.value && nonRouteNow:
      {
        await router.replace("/application-forms");
      }
      break;
  }
};

authStore.$onAction(({ name, after }) => {
  if (name === "loadUser") {
    after(onAlterLoadUser);
  }
});
</script>
