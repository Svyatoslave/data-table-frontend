<template>
  <Head>
    <title>{{ createHeadTitle("Дашборд") }}</title>
  </Head>
  <PageLayout>
    <div v-if="user !== null" class="dashboard-view">
      <NCard
        :title="`Пользователь: ${user.fullName}`"
        :segmented="{
          content: true,
        }"
        class="dashboard-view__card"
        size="huge"
      >
        <NP>Роль: {{ user.role }}</NP>
        <NP>E-mail: {{ user.email }}</NP>
        <NP>Телефон: {{ user.phone }}</NP>
        <NP>Организация: {{ user.organization }}</NP>
        <template #action>
          <NButton
            block
            :disabled="isLogouting"
            :loading="isLogouting"
            type="primary"
            attr-type="submit"
            size="large"
            @click="onLogout"
          >
            Выйти
          </NButton></template
        >
      </NCard>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Head } from "@vueuse/head";
import { NCard, NP, NButton } from "naive-ui";
import { storeToRefs } from "pinia";

import { createHeadTitle } from "@/shared/utils/meta";
import { PageLayout } from "@/shared/components/layouts";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { logout } = authStore;

const isLogouting = ref<boolean>(false);

const onLogout = async () => {
  isLogouting.value = true;
  await logout();
  isLogouting.value = false;
  await router.push("/auth/login");
};
</script>

<style scoped>
.dashboard-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.dashboard-view__card {
  width: 400px;
}
</style>
