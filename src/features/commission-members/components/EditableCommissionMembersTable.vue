<template>
  <VTable class="scm__table">
    <template #colgroup>
      <colgroup>
        <col style="width: 44px" />
        <col style="width: 1165px" />
        <col v-if="editable" style="width: 28px" />
      </colgroup>
    </template>
    <template #header>
      <VTr>
        <VTh>№</VTh>
        <VTh>ФИО</VTh>
        <VTh v-if="editable"></VTh>
      </VTr>
    </template>
    <template #body>
      <template v-if="isNonNullable(commissionMembers)">
        <VTr v-for="(item, idx) in commissionMembers" :key="item.id">
          <VTd>{{ idx + 1 }}</VTd>
          <VTd> {{ displayMembersCommissionFullName(item) }}</VTd>
          <VTd v-if="editable">
            <TrashIcon @click="handleClickDelete(item)" />
          </VTd>
        </VTr>
      </template>
      <template v-if="hasAddRaw">
        <VTr>
          <VTd>
            {{ idxAddRow }}
          </VTd>
          <VTd colspan="2">
            <NSelect
              remote
              filterable
              :to="selectTeleportTo"
              :options="options"
              :loading="isFetching"
              @update:value="handleUpdateSelect"
              @search="handleSearch"
            />
          </VTd>
        </VTr>
      </template>
    </template>
  </VTable>
  <template v-if="editable">
    <div class="scm__actions">
      <VButton
        variant="contained"
        color="secondary"
        size="m"
        :disabled="hasAddRaw"
        class="select__btn"
        @click="handleAddRaw"
      >
        <template #start-icon>
          <PlusIcon />
        </template>
        Добавить участника
      </VButton>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, computed, toRef } from "vue";
import { NSelect } from "naive-ui";

import { VTable, VTd, VTr, VTh } from "@/shared/components/data-display";
import { VButton } from "@/shared/components/inputs";
import { TrashIcon, PlusIcon } from "@/shared/components/icons";

import {
  displayMembersCommissionFullName,
  optionsMembersCommissionFullName,
  useCommissionMembers,
  type CommissionMember,
} from "@/features/commission-members";
import { isNonNullable } from "@/shared/utils/equal";
import type { Nullable, Optional } from "@/shared/types/utility";
import type { SelectOptions } from "@/shared/types/select";

export interface EditableCommissionMembersTableProps {
  editable: boolean;
  initialHasAddRaw?: boolean;
  selectTeleportTo?: string;
  commissionMembers?: CommissionMember[];
}

export interface EditableCommissionMembersTableEmits {
  (e: "select", value: CommissionMember): void;
  (e: "delete", value: CommissionMember): void;
}

const props = withDefaults(defineProps<EditableCommissionMembersTableProps>(), {
  initialHasAddRaw: false,
});

const emit = defineEmits<EditableCommissionMembersTableEmits>();

const searchValue = ref<Nullable<string>>(null);
const hasAddRaw = ref<boolean>(props.initialHasAddRaw);

const { isFetching, data } = useCommissionMembers({
  search: searchValue,
  queryConfig: {
    enabled: toRef(props, "editable"),
  },
});

const options = computed<Optional<SelectOptions<string>>>(() =>
  isNonNullable(data.value)
    ? optionsMembersCommissionFullName(
        data.value.items.filter(({ id }) =>
          isNonNullable(props.commissionMembers)
            ? !props.commissionMembers.find(
                ({ id: compareID }) => id === compareID
              )
            : undefined
        )
      )
    : undefined
);

const idxAddRow = computed<number>(() =>
  isNonNullable(props.commissionMembers)
    ? props.commissionMembers.length + 1
    : 1
);

const handleAddRaw = () => {
  hasAddRaw.value = true;
};

const handleSearch = (value: string) => {
  searchValue.value = value;
};

const handleUpdateSelect = (value: string) => {
  if (!isNonNullable(data.value)) {
    return;
  }

  const commissionMember = data.value.items.find(({ id }) => id === value);
  if (!isNonNullable(commissionMember)) {
    return;
  }

  emit("select", commissionMember);
  hasAddRaw.value = false;
};

const handleClickDelete = (commissionMember: CommissionMember) => {
  emit("delete", commissionMember);
};
</script>

<style scoped>
.select__btn {
  margin: 22px 0 40px;
}
</style>

<style>
.select .n-base-selection__border {
  border: none;
}
</style>
