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
import { NH1, NH3 } from "naive-ui";

import { createHeadTitle } from "@/shared/utils/meta";
import { ETPIcon } from "@/shared/components/icons";
import { LoginForm } from "@/features/auth";

const router = useRouter();

const onSuccess = async () => {
  await router.replace("/application-forms");
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
