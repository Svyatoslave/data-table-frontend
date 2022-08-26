<template>
  <div class="certificate" @click="handleSelect">
    <CertificateIcon class="certificate__icon" />
    <div class="certificate__body">
      <VTypography variant="body3">
        {{ certificate.subjectInfo }}
      </VTypography>
      <VTypography variant="body10" class="certificate__date">
        Выдан {{ displayDate(certificate.validPeriod.from) }}
      </VTypography>
      <VTypography variant="body10" class="certificate__date">
        Срок действия {{ displayDate(certificate.validPeriod.to) }}
      </VTypography>
    </div>
    <VCheckbox :checked="selected" @update:checked="handleSelect" />
  </div>
</template>

<script setup lang="ts">
import type { CryptoProCertificate } from "@/lib/crypto-pro";
import { VTypography } from "@/shared/components/data-display";
import { CertificateIcon } from "@/shared/components/icons";
import { VCheckbox } from "@/shared/components/inputs";
import { displayDate } from "@/shared/utils/display";

interface CertificateCardProps {
  selected: boolean;
  certificate: CryptoProCertificate;
}

interface CertificateCardEmits {
  (e: "select", certificate: CryptoProCertificate): void;
  (e: "unselect"): void;
}

const props = defineProps<CertificateCardProps>();

const emit = defineEmits<CertificateCardEmits>();

const handleSelect = () => {
  if (!props.selected) {
    emit("select", props.certificate);
  } else {
    emit("unselect");
  }
};
</script>

<style scoped>
.certificate {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 10px 15px;
  border-radius: 4px;
  user-select: none;
  transition: all 0.125s;
}

.certificate:hover {
  cursor: pointer;
  background-color: rgba(241, 241, 245, 0.5);
}

.certificate__icon {
  flex: 0 0 auto;
}

.certificate__body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.certificate__date {
  margin-top: 5px;
}
</style>
