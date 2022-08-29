<template>
  <SEO title="Участники комиссии повестки" />
  <PageLayout>
    <template #header-actions>
      <SummonsBackLink />
    </template>
    <template #header><SummonSubLinks :summon-id="summonID" /></template>
    <template #default>
      <PagePaper>
        <VTypography variant="title1" class="scm__title">
          Участники комиссии
        </VTypography>
        <EditableCommissionMembersTable
          :initialHasAddRaw="false"
          :editable="canEdit"
          :commissionMembers="data?.items"
          @select="handleSelect"
          @delete="handleDelete"
        />
      </PagePaper>
    </template>
    <template #footer>
      <VButton color="secondary" @click="handleOpenFormingModal">
        Сформировать протокол
      </VButton>
    </template>
  </PageLayout>
  <FormingProtocolModal
    :visible="openedFormingModal"
    :summon-id="summonID"
    @close="handleCloseFormingModal"
    @success="handleSuccessForming"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { VTypography } from "@/shared/components/data-display";
import { PageLayout, PagePaper } from "@/shared/components/layouts";
import { VButton } from "@/shared/components/inputs";
import { useParamID } from "@/shared/composables";
import {
  type CommissionMember,
  EditableCommissionMembersTable,
} from "@/features/commission-members";
import { useAuthorization } from "@/features/auth";
import {
  FormingProtocolModal,
  SummonsBackLink,
  SummonSubLinks,
  useFormingProtocolModal,
  useSummonCommissionMembers,
  useDeleteSummonCommissionMemberModal,
  useUpdateSummonCommissionMemberModal,
} from "@/features/summons";

const summonID = useParamID();

const { data, refetch } = useSummonCommissionMembers({
  summonID: summonID,
});

const { checkAccess } = useAuthorization();

const { deleteSummonCommissionMember } = useDeleteSummonCommissionMemberModal({
  onSuccess: () => {
    refetch.value();
  },
});
const { updateSummonCommissionMember } = useUpdateSummonCommissionMemberModal({
  onSuccess: () => {
    refetch.value();
  },
});

const {
  openedFormingModal,
  openFormingModal,
  closeFormingModal,
  redirectAfterSuccessForming,
} = useFormingProtocolModal();

const canEdit = computed(() =>
  checkAccess({ allowedRoles: ["SecretaryCommission"] })
);

const handleSelect = (commissionMember: CommissionMember) => {
  updateSummonCommissionMember(summonID, String(commissionMember.id));
};

const handleDelete = (commissionMember: CommissionMember) => {
  deleteSummonCommissionMember(summonID, String(commissionMember.id));
};

const handleOpenFormingModal = () => {
  openFormingModal();
};

const handleCloseFormingModal = () => {
  closeFormingModal();
};

const handleSuccessForming = () => {
  redirectAfterSuccessForming();
};
</script>

<style scoped>
.scm__title {
  margin-bottom: 40px;
}
</style>
