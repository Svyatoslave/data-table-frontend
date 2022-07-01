<template>
  <nav class="sidebar">
    <PageSidebarLink to="/application-forms">Заявки</PageSidebarLink>
    <EDivider />
    <PageSidebarLink to="/agendas">Повестки</PageSidebarLink>
    <EDivider />
    <PageSidebarLink to="/protocols"> Протоколы </PageSidebarLink>
  </nav>
</template>

<script setup lang="ts">
import { EDivider } from "@/shared/components/data-display";
import { PageSidebarLink } from "@/shared/components/layouts";
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
