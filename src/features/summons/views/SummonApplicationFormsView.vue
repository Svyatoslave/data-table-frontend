<template>
  <Head>
    <title>{{ createHeadTitle("Заявки повестки") }}</title>
  </Head>
  <PageLayout>
    <template #header-actions>
      <BackLink to="/summons">Список повесток </BackLink>
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
import { Head } from "@vueuse/head";

import { createHeadTitle } from "@/shared/utils/meta";
import {
  TableBody,
  TableHead,
  EPagination,
  PaginationInfo,
  EDivider,
} from "@/shared/components/data-display";
import { BackLink } from "@/shared/components/navigation";
import {
  PageLayout,
  ContentContainer,
  SidebarFiller,
} from "@/shared/components/layouts";
import { isNonNullable } from "@/shared/utils/equal";
import { useParamId } from "@/shared/composables";
import {
  SummonSublinks,
  useSummonApplicationFormsTable,
} from "@/features/summons";

const summonID = useParamId();

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
