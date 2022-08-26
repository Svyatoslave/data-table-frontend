<template>
  <div class="file-link">
    <VInlineLink
      :disabled="disabled"
      :color="color"
      :reference="reference"
      class="inline-link"
      ><slot></slot> <template #end-icon><DownloadIcon /></template
    ></VInlineLink>
  </div>
</template>

<script setup lang="ts">
import {
  type VInlineLinkColorKind,
  VInlineLink,
} from "@/shared/components/navigation";
import { DownloadIcon } from "@/shared/components/icons";

export interface VFileLinkProps {
  disabled?: boolean;
  reference: string;
  color?: VInlineLinkColorKind;
}

defineProps<VFileLinkProps>();
</script>

<style scoped></style>
