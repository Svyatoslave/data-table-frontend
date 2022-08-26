<template>
  <SEO title="Ошибка: Требуется авторизация" />
  <ErrorTemplate
    :status="403"
    title="Доступ запрещен"
    description="Возможно страница не доступна или отсутствует разрешение открывать ее. Обратитесь за необходимыми учетными данными к администратору.

Очистите кэш и cookies браузера. Это может быть эффективно, если ранее вы заходили на сайт без проблем.

Обновите страницу или зайдите позже."
  />
</template>

<script setup lang="ts">
import { SEO } from "@/lib/meta";
import { ErrorTemplate } from "@/features/errors";
</script>
