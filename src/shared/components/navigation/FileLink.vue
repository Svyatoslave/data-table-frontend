<template>
  <div class="file-link">
    <InlineLink :reference="reference" class="inline-link"
      ><slot></slot> <template #end-icon><DownloadIcon /></template
    ></InlineLink>
  </div>
</template>

<script setup lang="ts">
import { InlineLink } from "@/shared/components/navigation";
import { DownloadIcon } from "@/shared/components/icons";
export interface InlineLinkProps {
  reference: string;
}
defineProps<InlineLinkProps>();
</script>

<style scoped></style>
