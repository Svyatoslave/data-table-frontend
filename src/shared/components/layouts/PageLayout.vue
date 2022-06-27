<template>
  <PageHeader>
    <template #actions>
      <slot name="header-actions"></slot>
    </template>
    <template #default>
      <slot name="header"></slot>
    </template>
  </PageHeader>
  <PageSidebar />
  <PageContainer>
    <slot></slot>
  </PageContainer>
  <PageFooter>
    <slot name="footer"></slot>
  </PageFooter>
</template>

<script setup lang="ts">
import {
  PageHeader,
  PageFooter,
  PageSidebar,
  PageContainer,
} from "@/shared/components/layouts";
</script>
