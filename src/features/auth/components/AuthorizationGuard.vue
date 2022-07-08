<template>
  <slot v-if="canAccess"></slot>
  <slot v-else name="fallback"></slot>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthorization } from "@/features/auth";
import type { UserRoleName } from "@/features/users";

export interface AuthorizationGuardProps {
  allowedRoles: UserRoleName[];
}

const props = defineProps<AuthorizationGuardProps>();

const { checkAccess } = useAuthorization();

const canAccess = computed(() =>
  checkAccess({ allowedRoles: props.allowedRoles })
);
</script>
