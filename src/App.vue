<template>
  <NConfigProvider
    :locale="ruRU"
    :date-locale="dateRuRU"
    :theme-overrides="themeOverrides"
  >
    <AuthProvider>
      <RouterView />
    </AuthProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { NConfigProvider, ruRU, dateRuRU } from "naive-ui";

import { themeOverrides } from "@/shared/theme";
import { AuthProvider } from "@/features/auth";
</script>
