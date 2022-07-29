<template>
  <SEO title="Логи" />
  <PageLayout>
    <template #header>
      <div class="logs-view__header">
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
import { SEO } from "@/lib/meta";
import { TableBody, TableHead } from "@/shared/components/data-display";
import {
  PageLayout,
  ContentContainer,
  SidebarFiller,
} from "@/shared/components/layouts";
import { UseLogsTable } from "@/features/logs";

const {
  columns,
  logsQuery: { data, isFetching },
  getRowKey,
} = UseLogsTable();
</script>

<style scoped>
.logs-view__header {
  display: flex;
}
</style>
