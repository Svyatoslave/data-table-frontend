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
  <PageMain>
    <slot></slot>
  </PageMain>
  <PageFooter>
    <slot name="footer"></slot>
  </PageFooter>
</template>

<script setup lang="ts">
import {
  PageHeader,
  PageFooter,
  PageSidebar,
  PageMain,
} from "@/shared/components/layouts";
</script>
