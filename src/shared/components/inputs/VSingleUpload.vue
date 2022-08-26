<template>
  <NUpload
    :file-list="files"
    :max="1"
    :accept="accept"
    class="single-upload"
    @update:file-list="handleUpdateFileList"
  >
    <NUploadDragger>
      <div class="single-upload__content">
        <UploadIcon :size="40" />
        <VTypography variant="body3" class="single-upload__title">
          Нажмите или перетащите файл в эту область для загрузки
        </VTypography>
      </div>
    </NUploadDragger>
  </NUpload>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { type UploadFileInfo, NUpload, NUploadDragger } from "naive-ui";

import { VTypography } from "@/shared/components/data-display";
import { UploadIcon } from "@/shared/components/icons";
import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

export interface SingleFileUploadProps {
  file: Nullable<UploadFileInfo>;
  accept?: string;
}

export interface SingleFileUploadEmits {
  (e: "update:file", value: UploadFileInfo): void;
}

const props = defineProps<SingleFileUploadProps>();

const emit = defineEmits<SingleFileUploadEmits>();

const files = computed<UploadFileInfo[]>(() =>
  isNonNullable(props.file) ? [props.file] : ([] as UploadFileInfo[])
);

const handleUpdateFileList = (fileList: UploadFileInfo[]) => {
  emit("update:file", fileList[0]);
};
</script>

<style scoped>
.single-upload__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.single-upload__title {
  margin-top: 30px;
}
</style>
