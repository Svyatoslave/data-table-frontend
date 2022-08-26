<template>
  <VModalOverlay :visible="visible">
    <VModal size="m" title="Импорт новой версии" @close="handleClose">
      <template #default>
        <VSingleUpload accept=".docx" v-model:file="file" />
      </template>
      <template #actions>
        <VButton
          variant="contained"
          color="primary"
          :disabled="isEmptyFile"
          :loading="isLoading"
          @click="handleImport"
        >
          Импортировать
        </VButton>
        <VButton variant="outlined" color="primary" @click="handleCancel">
          Отменить
        </VButton>
      </template>
    </VModal>
  </VModalOverlay>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { UploadFileInfo } from "naive-ui";

import { useToast } from "@/lib/toast";
import { VButton, VSingleUpload } from "@/shared/components/inputs";
import { VModal, VModalOverlay } from "@/shared/components/overlay";
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";
import { useImportSummonTemplate } from "@/features/summons";

interface ImportSummonTemplateModalProps {
  visible: boolean;
  summonId: string;
}

interface ImportSummonTemplateModalEmits {
  (e: "close"): void;
  (e: "cancel"): void;
  (e: "success"): void;
  (e: "failure"): void;
}

const props = defineProps<ImportSummonTemplateModalProps>();

const emit = defineEmits<ImportSummonTemplateModalEmits>();

const toast = useToast();

const { isLoading, mutate } = useImportSummonTemplate({
  onSuccess: () => {
    file.value = null;

    emit("close");
    emit("success");

    toast({
      kind: "success",
      title: "Новая версия шаблона успешно добавлена",
    });
  },
  onError: () => {
    file.value = null;

    emit("close");
    emit("failure");

    toast({ kind: "warning", title: "Ошибка сервера" });
  },
});

const file = ref<Nullable<UploadFileInfo>>(null);

const isEmptyFile = computed(() => !isNonNullable(file.value));

const handleImport = () => {
  if (isNonNullable(file.value)) {
    const innerFile = file.value.file as File;

    mutate({
      summonID: props.summonId,
      file: innerFile,
    });
  }
};

const handleClose = () => {
  file.value = null;

  emit("close");
};

const handleCancel = () => {
  file.value = null;

  emit("close");
  emit("cancel");
};
</script>
