<template>
  <SEO title="Повестки" />
  <PageLayout>
    <template #header>
      <div class="summons-view__header">
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
      >
        <template #selection="{ disabled, row }: TableRowCtx<Summon>">
          <div class="summons-view__row-selection">
            <span>{{ row.id }}</span>
            <RouterLink
              custom
              :to="`/summons/${row.id}/application-forms`"
              v-slot="{ navigate }"
            >
              <LinkIcon :disabled="disabled" @click="navigate" />
            </RouterLink>
          </div>
        </template>
        <template #delete="{ row }: TableRowCtx<Summon>">
          <div>
            <TrashIcon @click="deleteSummon(String(row.id))" />
          </div>
        </template>
      </DataTableBody>
    </template>
    <template #footer>
      <div></div>
      <template v-if="isNonNullable(total)">
        <VPagination
          v-model:page="page"
          :total="total"
          :page-size="pageSize"
          :per-page="5"
        />
        <VPaginationInfo
          text="Показаны повестки"
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
  DataTableBody,
  DataTableHead,
  VPagination,
  VPaginationInfo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type TableRowCtx,
} from "@/shared/components/data-display";
import {
  PageLayout,
  ContentContainer,
  PageSidebarFiller,
} from "@/shared/components/layouts";
import { LinkIcon, TrashIcon } from "@/shared/components/icons";
import { isNonNullable } from "@/shared/utils/equal";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type Summon,
  useSummonsTable,
  useDeleteSummonModal,
} from "@/features/summons";

const {
  columns,
  pagination: { page, pageSize, total },
  summonsQuery: { data, isFetching, refetch },
  getRowKey,
} = useSummonsTable();

const { deleteSummon } = useDeleteSummonModal({
  onSuccess: () => {
    refetch.value();
  },
});
</script>

<style scoped>
.summons-view__header {
  display: flex;
}

.summons-view__row-selection {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
