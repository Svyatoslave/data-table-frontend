<template>
  <nav class="sidebar">
    <PageSidebarLink to="/">Заявки</PageSidebarLink>
    <PageSidebarLink to="/agendas">Повестки</PageSidebarLink>
    <PageSidebarLink to="/protocols" :has-divider="false">
      Протоколы
    </PageSidebarLink>
  </nav>
</template>

<script setup lang="ts">
import { PageSidebarLink } from ".";
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

.sidebar__link {
  padding: 22px 30px;
  color: var(--dark-blue-color);
  text-decoration: none;
  transition: all 0.075s;
}

.sidebar__link:hover,
.sidebar__link--active {
  background-color: var(--grayish-cyan-color);
}
</style>
