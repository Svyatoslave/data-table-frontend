<template>
  <SEO title="Заявки повестки" />
  <PageLayout>
    <template #header-actions>
      <SummonsBackLink />
    </template>
    <template #header>
      <SummonSublinks :summon-id="summonID" />
      <EDivider />
      <div class="aftv__header">
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
    <template #footer>
      <div></div>
      <template v-if="isNonNullable(total)">
        <EPagination
          v-model:page="page"
          :total="total"
          :page-size="pageSize"
          :per-page="5"
        />
        <PaginationInfo
          text="Показаны заявки повестки"
          :page="page"
          :page-size="pageSize"
          :total="total"
        />
      </template>
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { SEO } from "@/lib/meta";
import {
  TableBody,
  TableHead,
  EPagination,
  PaginationInfo,
  EDivider,
} from "@/shared/components/data-display";
import {
  PageLayout,
  ContentContainer,
  SidebarFiller,
} from "@/shared/components/layouts";
import { isNonNullable } from "@/shared/utils/equal";
import { useParamID } from "@/shared/composables";
import {
  SummonsBackLink,
  SummonSublinks,
  useSummonApplicationFormsTable,
} from "@/features/summons";

const summonID = useParamID();

const {
  columns,
  pagination: { page, pageSize, total },
  summonApplicationFormsQuery: { data, isFetching },
  getRowKey,
} = useSummonApplicationFormsTable({
  summonID,
});
</script>

<style scoped>
.aftv__header {
  display: flex;
}

.aftv__row-selection {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
