<template>
  <BaseIcon
    :width="size"
    :height="size"
    class="user-icon"
    :class="{ [`user-icon--active`]: active }"
  >
    <circle cx="10" cy="10" r="8.5" stroke="#001329" />
    <circle cx="10" cy="7" r="2.5" stroke="#001329" />
    <path
      d="M5.54356 16.9043C5.40525 16.1949 5.58018 14.8187 6.29091 13.6205C6.98332 12.4532 8.15444 11.5 10.002 11.5V10.5C7.73546 10.5 6.26699 11.7007 5.43084 13.1103C4.61302 14.489 4.37041 16.1128 4.56205 17.0957L5.54356 16.9043ZM10.002 11.5C11.7997 11.5 12.967 12.3263 13.6655 13.4062C14.3792 14.5097 14.6056 15.8867 14.4565 16.9292L15.4464 17.0708C15.6273 15.8056 15.3586 14.1826 14.5051 12.8631C13.6363 11.5199 12.1639 10.5 10.002 10.5V11.5Z"
      fill="#001329"
    />
  </BaseIcon>
</template>

<script setup lang="ts">
import { BaseIcon } from "@/shared/components/icons";

export interface UserIconProps {
  active?: boolean;
  size?: number;
}

withDefaults(defineProps<UserIconProps>(), {
  active: false,
  size: 20,
});
</script>

<style scoped>
.user-icon {
  outline: none;
}

.user-icon:hover {
  cursor: pointer;
}

.user-icon--active circle,
.user-icon:hover circle {
  stroke: var(--green-color);
}

.user-icon--active path,
.user-icon:hover path {
  fill: var(--green-color);
}
</style>
