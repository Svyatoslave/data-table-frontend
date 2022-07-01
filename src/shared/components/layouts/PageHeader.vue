<template>
  <header ref="headerRef" class="header">
    <ContentContainer class="header__container">
      <div class="header__inner">
        <div class="header__logos">
          <img
            src="@/assets/images/mono-logo.png"
            class="header__mono-logo"
            alt="mono-logo"
          />
          <EDivider flex-item orientation="vertical" />
          <ETypography
            variant="title4"
            uppercase
            class="header__commission-exclusion"
          >
            Рассмотрение комиссии
          </ETypography>
        </div>
        <div class="header__info">
          <slot name="actions"></slot>
          <div class="header__actions">
            <EBadge class="header__icon">
              <template #content>6</template>
              <template #default>
                <BellIcon />
              </template>
            </EBadge>
            <UserIcon class="header__icon" />
          </div>
        </div>
      </div>
    </ContentContainer>
    <EDivider v-if="hasSlotContent(slots.default)" />
    <slot></slot>
  </header>
</template>

<script setup lang="ts">
import { ref, useSlots, watch } from "vue";
import { useElementSize, useCssVar } from "@vueuse/core";

import { ContentContainer } from "@/shared/components/layouts";
import {
  EDivider,
  EBadge,
  ETypography,
} from "@/shared/components/data-display";
import { BellIcon, UserIcon } from "@/shared/components/icons";
import { createMeasurableProp } from "@/shared/utils/styles";
import { hasSlotContent } from "@/shared/utils/vue";

const slots = useSlots();

const headerRef = ref(null);
const { height } = useElementSize(headerRef);
const headerFullHeightVar = useCssVar("--header-full-height");

watch(height, (currentHeight) => {
  headerFullHeightVar.value = createMeasurableProp(currentHeight);
});
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  box-shadow: var(--header-shadow);
  background-color: var(--white-color);
  z-index: 2;
}

.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-inner-height);
}

.header__logos {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header__commission-exclusion {
  color: var(--blue-color);
}

.header__info {
  display: flex;
}

.header__actions {
  display: flex;
  gap: 35px;
}

.header__icon:hover {
  cursor: pointer;
}
</style>
