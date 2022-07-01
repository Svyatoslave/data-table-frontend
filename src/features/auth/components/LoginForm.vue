<template>
  <form class="login-form" @submit="onSubmit">
    <NFormItem
      required
      label="Логин"
      :validation-status="errors.login ? 'error' : 'success'"
      :feedback="errors.login"
    >
      <NInput
        size="large"
        :input-props="{ name: 'login' }"
        v-model:value="login"
      />
    </NFormItem>
    <NFormItem
      required
      label="Пароль"
      :validation-status="errors.password ? 'error' : 'success'"
      :feedback="errors.password"
    >
      <NInput
        type="password"
        size="large"
        :input-props="{ name: 'password' }"
        show-password-on="mousedown"
        v-model:value="password"
      />
    </NFormItem>
    <NButton
      block
      :loading="isSubmitting"
      :disabled="isSubmitting"
      type="primary"
      attr-type="submit"
      size="large"
      class="login-form__button-submit"
    >
      Войти
    </NButton>
    <NDivider />
    <NButton
      block
      disabled
      tag="a"
      size="large"
      class="login-form__button-esia"
    >
      Войти через госуслуги (ЕСИА)
    </NButton>
  </form>
</template>

<script setup lang="ts">
import { NFormItem, NInput, NButton, NDivider } from "naive-ui";
import { useField, useForm } from "vee-validate";
import { object, string, type InferType } from "yup";

import { useAuthStore } from "@/stores/auth";

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
  width: 100%;
}

.login-form__button-submit {
  margin-top: 10px;
}

.login-form__button-esia {
  box-sizing: border-box;
}
</style>
