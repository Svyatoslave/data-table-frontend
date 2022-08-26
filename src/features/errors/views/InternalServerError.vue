<template>
  <SEO title="Ошибка сервера" />
  <ErrorTemplate
    :status="500"
    title="Ошибка сервера"
    description="По каким-то причинам на сервере произошла непредвиденная ошибка. Попробуйте перезагрузить страницу через некоторое время. "
  />
</template>

<script setup lang="ts">
import { SEO } from "@/lib/meta";
import { ErrorTemplate } from "@/features/errors";
</script>
