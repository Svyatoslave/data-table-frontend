<template>
  <BaseIcon :width="size" :height="size" class="password-icon">
    <circle cx="10" cy="11.5" r="3" stroke="#002855" />
    <path
      d="M2.28755 10.8669C2.21408 11.1331 2.37032 11.4085 2.63651 11.4819C2.9027 11.5554 3.17804 11.3992 3.25151 11.133L2.28755 10.8669ZM16.7483 11.133C16.8218 11.3992 17.0971 11.5554 17.3633 11.4819C17.6295 11.4085 17.7857 11.1331 17.7123 10.8669L16.7483 11.133ZM3.25151 11.133C4.06847 8.17297 6.78107 5.99994 9.99992 5.99994V4.99994C6.3197 4.99994 3.22109 7.48454 2.28755 10.8669L3.25151 11.133ZM9.99992 5.99994C13.2188 5.99994 15.9314 8.17297 16.7483 11.133L17.7123 10.8669C16.7787 7.48454 13.6801 4.99994 9.99992 4.99994V5.99994Z"
      fill="#002855"
    />
    <transition-group>
      <template v-if="!active">
        <path
          d="M3 1.59998L18.5 17.1001"
          stroke="white"
          stroke-linecap="round" />
        <path
          d="M2.5 2.49994L17.5 17.4999"
          stroke="#002855"
          stroke-linecap="round"
      /></template>
    </transition-group>
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface PasswordIconProps {
  active?: boolean;
  size?: number;
}

withDefaults(defineProps<PasswordIconProps>(), {
  active: false,
  size: 20,
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.password-icon {
  outline: none;
}
</style>
