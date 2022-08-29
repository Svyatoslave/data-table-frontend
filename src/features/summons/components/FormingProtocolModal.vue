<template>
  <VModalOverlay :visible="visible">
    <VModal
      size="l"
      title="Подтверждение действия"
      subtitle="Вы точно хотите сформировать протокол со следующими участниками?"
      :loading="isFetching"
      @close="handleClose"
    >
      <template #default>
        <EditableCommissionMembersTable
          v-if="isNonNullable(data)"
          :editable="false"
          :commission-members="data.items"
        />
      </template>
      <template #actions>
        <VButton
          variant="contained"
          color="primary"
          :loading="isLoading"
          @click="handleConfirm"
        >
          Подтвердить
        </VButton>
        <VButton variant="outlined" color="primary" @click="handleCancel">
          Отменить
        </VButton>
      </template>
    </VModal>
  </VModalOverlay>
</template>

<script setup lang="ts">
import { toRef } from "vue";

import { useToast } from "@/lib/toast";
import { VButton } from "@/shared/components/inputs";
import { VModal, VModalOverlay } from "@/shared/components/overlay";
import { isNonNullable } from "@/shared/utils/equal";
import { EditableCommissionMembersTable } from "@/features/commission-members";
import {
  useFormingProtocol,
  useSummonCommissionMembers,
} from "@/features/summons";

interface FormingProtocolModalProps {
  visible: boolean;
  summonId: string;
}

interface FormingProtocolModalEmits {
  (e: "close"): void;
  (e: "cancel"): void;
  (e: "success"): void;
  (e: "failure"): void;
}

const props = defineProps<FormingProtocolModalProps>();

const emit = defineEmits<FormingProtocolModalEmits>();

const toast = useToast();

const { isFetching, data } = useSummonCommissionMembers({
  summonID: props.summonId,
  enabled: toRef(props, "visible"),
});

const { isLoading, mutate } = useFormingProtocol({
  mutationConfig: {
    onSuccess: () => {
      emit("close");
      emit("success");

      toast({
        kind: "success",
        title: "Протокол успешно создан",
      });
    },
    onError: () => {
      emit("close");
      emit("failure");

      toast({ kind: "warning", title: "Ошибка сервера" });
    },
  },
});

const handleClose = () => {
  emit("close");
};

const handleConfirm = () => {
  mutate({ summonID: props.summonId });
};

const handleCancel = () => {
  emit("close");
  emit("cancel");
};
</script>
