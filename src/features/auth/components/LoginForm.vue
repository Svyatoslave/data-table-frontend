<template>
  <div style="width: 100%">
    <form class="login-form" @submit="onSubmit">
      <WrapperField :error="errors.login" class="login-form__field">
        <TextInput
          v-model="login"
          name="login"
          type="text"
          placeholder="Логин"
          :error="errors.login"
        />
      </WrapperField>
      <WrapperField :error="errors.password" class="login-form__field">
        <PasswordInput
          v-model="password"
          name="password"
          placeholder="Пароль"
          :error="errors.password"
        />
      </WrapperField>

      <div class="login-form__actions">
        <EButton
          type="submit"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          color="primary"
          variant="contained"
        >
          Войти
        </EButton>
        <EButton disabled color="primary" variant="outlined">
          Вход через ЕСИА
        </EButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { object, string, type InferType } from "yup";

import { useAuthStore } from "@/stores/auth";
import {
  EButton,
  WrapperField,
  TextInput,
  PasswordInput,
} from "@/shared/components/inputs";

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
