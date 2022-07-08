<template>
  <BaseIcon :width="size" :height="size" class="cross-icon">
    <path
      d="M15.5643 1.84997C15.9548 1.45944 15.9548 0.826278 15.5643 0.435754C15.1738 0.0452293 14.5406 0.0452293 14.1501 0.435754L15.5643 1.84997ZM0.435785 14.15C0.0452608 14.5406 0.0452608 15.1737 0.435785 15.5643C0.82631 15.9548 1.45947 15.9548 1.85 15.5643L0.435785 14.15ZM14.1501 0.435754L0.435785 14.15L1.85 15.5643L15.5643 1.84997L14.1501 0.435754Z"
      fill="#002855"
    />
    <path
      d="M1.84993 0.435754C1.4594 0.0452293 0.82624 0.0452293 0.435715 0.435754C0.0451912 0.826278 0.0451912 1.45944 0.435715 1.84997L1.84993 0.435754ZM14.15 15.5643C14.5405 15.9548 15.1737 15.9548 15.5642 15.5643C15.9547 15.1737 15.9547 14.5406 15.5642 14.15L14.15 15.5643ZM0.435715 1.84997L14.15 15.5643L15.5642 14.15L1.84993 0.435754L0.435715 1.84997Z"
      fill="#002855"
    />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface CrossIconProps {
  size?: number;
}

withDefaults(defineProps<CrossIconProps>(), {
  size: 16,
});
</script>

<style scoped>
.link-icon path {
  fill: all 0.125s;
}
.cross-icon:hover path {
  fill: var(--green-color);
}
</style>
