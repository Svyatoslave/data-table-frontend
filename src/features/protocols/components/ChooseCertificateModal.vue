<template>
  <VModalOverlay :visible="visible">
    <VModal
      not-padding-body
      title="Выбор сертификата"
      :loading="isFetching"
      :centered="isEmptyCertificates"
      :size="modalSize"
      :subtitle="subtitle"
      @close="emit('close')"
    >
      <template #default>
        <template v-if="isNonNullable(certificates)">
          <CertificateCard
            v-for="certificate in certificates"
            :key="certificate.thumbprint"
            :selected="isSelectedCertificate(certificate)"
            :certificate="certificate"
            @select="handleSelect"
            @unselect="handleUnselect"
          />
        </template>
      </template>
      <template #actions>
        <template v-if="isEmptyCertificates">
          <VButton disabled variant="contained" color="primary">
            Запросить сертификат
          </VButton>
        </template>
        <template v-else>
          <VButton
            :disabled="!nonEmptySelectedCertificate"
            variant="contained"
            color="primary"
            @click="handleSign"
          >
            Подписать
          </VButton>
          <VButton variant="outlined" color="primary" @click="handleCancel">
            Отменить
          </VButton>
        </template>
      </template>
    </VModal>
  </VModalOverlay>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { useToast } from "@/lib/toast";
import { useCryptoPro, type CryptoProCertificate } from "@/lib/crypto-pro";
import { VButton } from "@/shared/components/inputs";
import { VModal, VModalOverlay } from "@/shared/components/overlay";
import { isNonNullable, isEmptyArray } from "@/shared/utils/equal";
import type { Nullable, Optional } from "@/shared/types/utility";
import { CertificateCard } from "@/features/protocols";

interface ChooseCertificateModalProps {
  visible: boolean;
}

interface ChooseCertificateModalEmits {
  (e: "close"): void;
}

const props = defineProps<ChooseCertificateModalProps>();

const emit = defineEmits<ChooseCertificateModalEmits>();

const selectedCertificate = ref<Nullable<CryptoProCertificate>>();

const nonEmptySelectedCertificate = computed<boolean>(() =>
  isNonNullable(selectedCertificate.value)
);

const enabled = computed<boolean>(() => props.visible);

const toast = useToast();

const {
  certificatesQuery: { isFetching, data: certificates },
} = useCryptoPro({
  enabled,
  onError: (err) => {
    toast({
      kind: "warning",
      title: err.message,
    });
    emit("close");
  },
});

const isEmptyCertificates = computed<boolean>(
  () => isNonNullable(certificates.value) && isEmptyArray(certificates.value)
);

const subtitle = computed<Optional<string>>(() =>
  isNonNullable(certificates.value)
    ? isEmptyCertificates.value
      ? "У вас нет ни одного сертификата"
      : `${certificates.value.length} сертификат(а,ов)`
    : undefined
);

const modalSize = computed(() => {
  switch (isEmptyCertificates.value) {
    case true:
      return "m";
    case false:
    default:
      return "l";
  }
});

const isSelectedCertificate = (certificate: CryptoProCertificate): boolean =>
  isNonNullable(selectedCertificate.value) &&
  certificate.thumbprint === selectedCertificate.value.thumbprint;

const handleSelect = (certificate: CryptoProCertificate) => {
  selectedCertificate.value = certificate;
};

const handleUnselect = () => {
  selectedCertificate.value = null;
};

const handleSign = () => {
  selectedCertificate.value = null;
  emit("close");
};

const handleCancel = () => {
  selectedCertificate.value = null;
  emit("close");
};
</script>
