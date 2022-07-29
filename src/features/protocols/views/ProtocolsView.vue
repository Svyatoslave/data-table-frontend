<template>
  <SEO title="Протоколы" />
  <PageLayout>
    <template #header>
      <div class="protocols-view__header">
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
import { UseProtocolsTable } from "@/features/protocols";

const {
  columns,
  protocolsQuery: { data, isFetching },
  getRowKey,
} = UseProtocolsTable();
</script>

<style scoped>
.protocols-view__header {
  display: flex;
}
</style>
