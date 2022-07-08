<template>
  <nav class="sidebar">
    <AuthorizationGuard :allowed-roles="['SecretaryCommission']">
      <PageSidebarLink to="/application-forms">Заявки</PageSidebarLink>
      <EDivider />
    </AuthorizationGuard>
    <AuthorizationGuard
      :allowed-roles="['SecretaryCommission', 'MemberCommission']"
    >
      <PageSidebarLink to="/summons">Повестки</PageSidebarLink>
      <EDivider />
    </AuthorizationGuard>
    <AuthorizationGuard
      :allowed-roles="['SecretaryCommission', 'MemberCommission']"
    >
      <PageSidebarLink to="/protocols">Протоколы</PageSidebarLink>
    </AuthorizationGuard>
    <AuthorizationGuard :allowed-roles="['Admin']">
      <PageSidebarLink to="/users">Пользователи</PageSidebarLink>
      <EDivider />
    </AuthorizationGuard>
    <AuthorizationGuard :allowed-roles="['Admin']">
      <PageSidebarLink to="/logs">Логи</PageSidebarLink>
    </AuthorizationGuard>
  </nav>
</template>

<script setup lang="ts">
import { EDivider } from "@/shared/components/data-display";
import { PageSidebarLink } from "@/shared/components/layouts";
import { AuthorizationGuard } from "@/features/auth";
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  height: 100%;
  padding-top: calc(var(--header-full-height) + 40px);
  padding-bottom: calc(var(--header-full-height) + 40px);
  box-shadow: var(--header-shadow);
  background-color: var(--white-color);
  z-index: 1;
}
</style>
