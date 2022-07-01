<template>
  <Head>
    <title>{{ createHeadTitle("Заявки") }}</title>
  </Head>
  <PageLayout>
    <ETypography variant="title1">Заявки</ETypography>
  </PageLayout>
</template>

<script setup lang="ts">
import { Head } from "@vueuse/head";

import { createHeadTitle } from "@/shared/utils/meta";
import { PageLayout } from "@/shared/components/layouts";
import { ETypography } from "@/shared/components/data-display";
</script>

<style scoped></style>
