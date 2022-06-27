<template>
  <footer class="footer">
    <ContentContainer class="footer__container">
      <div class="footer__inner">
        <div class="footer__info">
          <MailIcon />
          <ETypography variant="body2" class="footer__feedback">
            Обратная связь
          </ETypography>
        </div>
        <slot></slot>
        <EPagination :total="23" v-model:page="cursor"></EPagination>
      </div>
    </ContentContainer>
  </footer>
</template>

<script setup lang="ts">
import { ContentContainer } from "@/shared/components/layouts";
import { ETypography, EPagination } from "@/shared/components/data-display";
import { MailIcon } from "@/shared/components/icons";
import { ref, watch } from "vue";

const cursor = ref<number>(1);

watch(cursor, (current) => {
  console.log(current);
});
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 56px;
  background: var(--footer-gradient);
  box-shadow: var(--footer-shadow);
  z-index: 2;
}

.footer__container {
  height: 100%;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.footer__info {
  display: flex;
  gap: 20px;
}

.footer__feedback {
  color: var(--white-color);
}
</style>
