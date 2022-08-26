<template>
  <SEO title="Внутренняя ошибка клиента" />
  <ErrorTemplate
    title="Внутренняя ошибка клиента"
    description="По каким-то причинам на клиентской части произошла непредвиденная ошибка. Попробуйте обновить страницу."
  />
</template>

<script setup lang="ts">
import { SEO } from "@/lib/meta";
import { ErrorTemplate } from "@/features/errors";
</script>
