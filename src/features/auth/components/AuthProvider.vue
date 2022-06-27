<template>
  <InitialSpin v-if="isInitial" />
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";
import InitialSpin from "./InitialSpin.vue";

const router = useRouter();
const authStore = useAuthStore();
const { isInitial, isAuthorized, isUnauthorized } = storeToRefs(authStore);
const { loadUser } = authStore;

onMounted(() => {
  loadUser();
});

const onAlterLoadUser = async () => {
  switch (true) {
    case isUnauthorized.value:
      {
        await router.push("/auth/login");
      }
      break;
    case isAuthorized.value:
      {
        await router.push("/");
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
