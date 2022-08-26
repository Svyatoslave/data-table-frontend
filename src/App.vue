<template>
  <ErrorBoundary stop-propagation>
    <template #default>
      <NConfigProvider
        :locale="ruRU"
        :date-locale="dateRuRU"
        :theme-overrides="themeOverrides"
      >
        <VToastProvider>
          <VConfirmProvider>
            <AuthenticationProvider>
              <RouterView />
            </AuthenticationProvider>
          </VConfirmProvider>
        </VToastProvider>
      </NConfigProvider>
    </template>
    <template #fallback>
      <InternalClientError />
    </template>
  </ErrorBoundary>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { RouterView } from "vue-router";
import { NConfigProvider, ruRU, dateRuRU } from "naive-ui";

import { ErrorBoundary } from "@/lib/error-boundary";
import { VToastProvider } from "@/lib/toast";
import { VConfirmProvider } from "@/lib/confirm";
import { info } from "@/lib/logger";
import { themeOverrides } from "@/shared/theme";
import { AuthenticationProvider } from "@/features/auth";
import { InternalClientError } from "@/features/errors";

const printLogo = () => {
  console.log(
    `%c
                             .__              .__
  ____  ____   _____   _____ |__| ______ _____|__| ____   ____
_/ ___\\/  _ \\ /     \\ /     \\|  |/  ___//  ___/  |/  _ \\ /    \\
\\  \\__(  <_> )  Y Y  \\  Y Y  \\  |\\___ \\ \\___ \\|  (  <_> )   |  \\
 \\___  >____/|__|_|  /__|_|  /__/____  >____  >__|\\____/|___|  /
     \\/            \\/      \\/        \\/     \\/               \\/
  `,
    "font-family:monospace;color:#008984;font-size:8px;"
  );
};

const logInitApp = () => {
  info(`initialize application`);
};

onMounted(() => {
  printLogo();
  logInitApp();
});
</script>
