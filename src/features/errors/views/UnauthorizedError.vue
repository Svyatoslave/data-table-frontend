<template>
  <SEO title="Ошибка: Требуется авторизация" />
  <ErrorTemplate
    :status="401"
    title="Требуется авторизация"
    description="Вы указали неправильные логин или пароль. Для входа
в систему авторизуйтесь снова либо обратитесь
к администратору."
  >
    <template #actions>
      <VButton
        :loading="isLoading"
        size="l"
        variant="contained"
        color="primary"
        @click="handleAuthentication"
      >
        Авторизоваться
      </VButton>
    </template>
  </ErrorTemplate>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMutation } from "vue-query";
import { storeToRefs } from "pinia";

import { SEO } from "@/lib/meta";
import { VButton } from "@/shared/components/inputs";
import { ErrorTemplate } from "@/features/errors";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const { isAuthenticated } = storeToRefs(authStore);

const { mutateAsync, isLoading } = useMutation({
  mutationFn: authStore.logout,
});

const handleAuthentication = async () => {
  if (isAuthenticated) {
    await mutateAsync();
  }

  await router.replace("/auth/login");
};
</script>
