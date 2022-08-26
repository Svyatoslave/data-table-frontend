<template>
  <SEO title="Ошибка: Страница не найдена" />
  <ErrorTemplate
    :status="404"
    title="Страница не найдена"
    description="Страница, на которую Вы хотели перейти, не найдена. Возможно, введен некорректный адрес или страница
не найдена была удалена. Попробуйте обновить страницу."
  />
</template>

<script setup lang="ts">
import { SEO } from "@/lib/meta";
import { ErrorTemplate } from "@/features/errors";
</script>
