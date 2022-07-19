<template>
  <NPopover
    :show="showPopover"
    :show-arrow="false"
    trigger="manual"
    placement="bottom-start"
    style="width: 200px; padding: 0"
    @clickoutside="handleClickOutiside"
    @update:show="changeShowFilter(true)"
  >
    <template #trigger>
      <UserIcon
        ref="iconRef"
        :active="showPopover"
        class="header__icon"
        @click="handleClickIcon"
      />
    </template>
    <div v-if="isNonNullable(user)" class="user-info__section user-info__info">
      <ETypography variant="title2">
        {{ displayUserFullName(user) }}
      </ETypography>
      <ETypography variant="body6" class="user-info__email">
        {{ user.email }}
      </ETypography>
    </div>
    <EDivider />
    <div
      v-if="isNonNullable(user)"
      class="user-info__section user-info__actions"
    >
      <EButton
        full-width
        :loading="isLoading"
        size="s"
        color="success"
        @click="handleLogout"
        >Выйти
      </EButton>
    </div>
  </NPopover>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "vue-query";
import { NPopover } from "naive-ui";
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";
import { UserIcon } from "@/shared/components/icons";
import { ETypography, EDivider } from "@/shared/components/data-display";
import { EButton } from "@/shared/components/inputs";
import { isNonNullable } from "@/shared/utils/equal";
import { displayUserFullName } from "@/features/users";
import type { Nullable } from "@/shared/types/utility";
import { unrefElement } from "@vueuse/core";

const router = useRouter();

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const showPopover = ref<boolean>(false);
const iconRef = ref<Nullable<HTMLElement>>(null);

const { mutateAsync, isLoading } = useMutation({
  mutationFn: authStore.logout,
});

const handleLogout = async () => {
  await mutateAsync();
  showPopover.value = false;
  await router.replace("/auth/login");
};

const changeShowFilter = (value: boolean) => {
  showPopover.value = value;
};

const handleClickOutiside = (event: MouseEvent) => {
  const el = unrefElement(iconRef);
  const composedPath = event.composedPath();

  if (!el || el === event.target || composedPath.includes(el)) return;

  showPopover.value = false;
};

const handleClickIcon = () => {
  showPopover.value = !showPopover.value;
};
</script>

<style scoped>
.user-info__section {
  padding: 16px;
}

.user-info__info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.user-info__email {
  color: #4d5a69;
}
</style>
