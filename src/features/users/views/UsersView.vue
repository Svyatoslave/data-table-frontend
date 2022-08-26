<template>
  <SEO title="Пользователи" />
  <PageLayout>
    <template #header>
      <div class="users-view__header">
        <PageSidebarFiller />
        <ContentContainer>
          <DataTableHead :columns="columns" />
        </ContentContainer>
      </div>
    </template>
    <template #default>
      <DataTableBody
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
import { SEO } from "@/lib/meta";
import { DataTableBody, DataTableHead } from "@/shared/components/data-display";
import {
  PageLayout,
  ContentContainer,
  PageSidebarFiller,
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
