<template>
  <VButton color="secondary" :loading="isFetching" @click="handleExport">
    Экспорт в .docx
  </VButton>
</template>

<script setup lang="ts">
import { saveAs } from "file-saver";

import { useToast } from "@/lib/toast";
import { VButton } from "@/shared/components/inputs";
import { createDocxBlobFromBuffer } from "@/shared/utils/blob";
import type { Nullable } from "@/shared/types/utility";
import { useSummonTemplateDocx } from "@/features/summons";
import { isNonNullable } from "@/shared/utils/equal";
import { toRef } from "vue";

interface ExportSummonTemplateDocxButtonProps {
  summonId: string;
  summonTemplateName: Nullable<string>;
}

const props = defineProps<ExportSummonTemplateDocxButtonProps>();

const toast = useToast();

const { isFetching, refetch } = useSummonTemplateDocx({
  enabled: false,
  summonID: props.summonId,
  summonTemplateName: toRef(props, "summonTemplateName"),
  onSuccess: (data) => {
    const blob = createDocxBlobFromBuffer(data);
    const fileName = isNonNullable(props.summonTemplateName)
      ? `${props.summonTemplateName}.docx`
      : `${props.summonId}.docx`;

    saveAs(blob, fileName);
  },
  onError: () => {
    toast({ kind: "warning", title: "Ошибка сервера" });
  },
});

const handleExport = () => {
  refetch.value();
};
</script>
