<template>
  <div style="width: 100%">
    <form class="login-form" @submit="onSubmit">
      <VField :error="errors.login" class="login-form__field">
        <VTextInput
          v-model="login"
          name="login"
          type="text"
          placeholder="Логин"
          :error="errors.login"
        />
      </VField>
      <VField :error="errors.password" class="login-form__field">
        <VPasswordInput
          v-model="password"
          name="password"
          placeholder="Пароль"
          :error="errors.password"
        />
      </VField>
      <div class="login-form__actions">
        <VButton
          type="submit"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          color="primary"
          variant="contained"
        >
          Войти
        </VButton>
        <VButton color="primary" variant="outlined" @click="handleLoginEsia">
          Вход через ЕСИА
        </VButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { object, string, type InferType } from "yup";

import { useAuthStore } from "@/stores/auth";
import {
  VButton,
  VField,
  VTextInput,
  VPasswordInput,
} from "@/shared/components/inputs";
import { createKeycloakLink } from "../utils/router";

interface LoginViewEmits {
  (e: "success"): void;
}

const emit = defineEmits<LoginViewEmits>();

const schema = object({
  login: string()
    .required("Это обязательное поле")
    .min(2, "Мин кол-во символов ${min}"),
  password: string()
    .required("Это обязательное поле")
    .min(8, "Мин кол-во символов ${min}"),
});

type LoginValues = InferType<typeof schema>;

const authStore = useAuthStore();

const { handleSubmit, errors, isSubmitting } = useForm<LoginValues>({
  validationSchema: schema,
});

const { value: login } = useField<string>("login");
const { value: password } = useField<string>("password");

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(values);
  emit("success");
});

const handleLoginEsia = () => {
  window.location.href = createKeycloakLink();
};
</script>

<style scoped>
.login-form {
  padding: 40px 50px;
}

.login-form__field {
  margin-bottom: 20px;
}
.login-form__actions {
  margin-top: 30px;
  display: flex;
  gap: 8px;
}
</style>
