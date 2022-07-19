<template>
  <footer class="footer">
    <SidebarFiller class="footer__sidebar-filler">
      <ETooltip placement="top-end">
        <template #trigger>
          <div class="footer__info">
            <MailIcon />
            <ETypography variant="body4" class="footer__feedback">
              Обратная связь
            </ETypography>
          </div>
        </template>
        Функционал находится в разработке
      </ETooltip>
    </SidebarFiller>
    <ContentContainer class="footer__container">
      <slot></slot>
    </ContentContainer>
  </footer>
</template>

<script setup lang="ts">
import { ContentContainer } from "@/shared/components/layouts";
import { ETypography } from "@/shared/components/data-display";
import { MailIcon } from "@/shared/components/icons";
import SidebarFiller from "./SidebarFiller.vue";
import { ETooltip } from "@/shared/components/overlay";
</script>

<style scoped>
.footer {
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  background: var(--footer-gradient);
  box-shadow: var(--footer-shadow);
  z-index: 500;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.footer__info {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 46px;
}

.footer__feedback {
  color: var(--white-color);
}

.footer__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}
</style>
