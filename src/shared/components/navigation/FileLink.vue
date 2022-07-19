<template>
  <div class="file-link">
    <InlineLink
      :disabled="disabled"
      :color="color"
      :reference="reference"
      class="inline-link"
      ><slot></slot> <template #end-icon><DownloadIcon /></template
    ></InlineLink>
  </div>
</template>

<script setup lang="ts">
import { InlineLink, type ColorKind } from "@/shared/components/navigation";
import { DownloadIcon } from "@/shared/components/icons";

export interface FileLinkProps {
  disabled?: boolean;
  reference: string;
  color?: ColorKind;
}

defineProps<FileLinkProps>();
</script>

<style scoped></style>
