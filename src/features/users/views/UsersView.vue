<template>
  <Head>
    <title>{{ createHeadTitle("Пользователи") }}</title>
  </Head>
  <PageLayout>
    <template #header>
      <div class="users-view__header">
        <SidebarFiller />
        <ContentContainer>
          <TableHead :columns="columns" />
        </ContentContainer>
      </div>
    </template>
    <template #default>
      <TableBody
        :loading="isFetching"
        :rows="data?.items"
        :columns="columns"
        :get-row-key="getRowKey"
        :is-disabled-row="() => false"
      />
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { Head } from "@vueuse/head";

import { createHeadTitle } from "@/shared/utils/meta";
import { TableBody, TableHead } from "@/shared/components/data-display";
import {
  PageLayout,
  ContentContainer,
  SidebarFiller,
} from "@/shared/components/layouts";
import { useUsersTable } from "@/features/users";

const {
  columns,
  usersQuery: { data, isFetching },
  getRowKey,
} = useUsersTable();
</script>

<style scoped>
.users-view__header {
  display: flex;
}
</style>
