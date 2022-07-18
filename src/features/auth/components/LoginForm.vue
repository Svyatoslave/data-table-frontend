<template>
  <div style="width: 100%">
    <form class="login-form" @submit="onSubmit">
      <NFormItem
        :show-label="false"
        required
        :validation-status="errors.login ? 'error' : 'success'"
        :feedback="errors.login"
      >
        <NInput
          :input-props="{ name: 'login' }"
          v-model:value="login"
          placeholder="Логин"
        />
      </NFormItem>
      <NFormItem
        :show-label="false"
        required
        :validation-status="errors.password ? 'error' : 'success'"
        :feedback="errors.password"
      >
        <NInput
          type="password"
          :input-props="{ name: 'password' }"
          show-password-on="mousedown"
          v-model:value="password"
          placeholder="Пароль"
        />
      </NFormItem>
      <div class="login-form__actions">
        <EButton
          type="submit"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          class="login-form__button-submit"
          color="primary"
          variant="contained"
        >
          Войти
        </EButton>
        <EButton
          disabled
          class="login-form__button-esia"
          color="primary"
          variant="outlined"
        >
          Вход через ЕСИА
        </EButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { NFormItem, NInput } from "naive-ui";
import { useField, useForm } from "vee-validate";
import { object, string, type InferType } from "yup";

import { useAuthStore } from "@/stores/auth";
import { EButton } from "@/shared/components/inputs";

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

.login-form__button-submit {
  padding: 0;
  width: 82px;
  border-radius: 3px;
}

.login-form__actions {
  margin-top: 6px;
  display: flex;
  gap: 8px;
}
</style>
