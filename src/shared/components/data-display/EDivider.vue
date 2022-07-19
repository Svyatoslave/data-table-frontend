<template>
  <hr
    class="divider"
    :class="[
      `divider--orientation-${orientation}`,
      { [`divider--flex-item`]: flexItem },
    ]"
  />
</template>

<script setup lang="ts">
export type OrientationKind = "horizontal" | "vertical";

export interface EDividerProps {
  flexItem?: boolean;
  orientation?: OrientationKind;
}

withDefaults(defineProps<EDividerProps>(), {
  flexItem: false,
  orientation: "horizontal",
});
</script>

<style>
.divider {
  flex-shrink: 0;
  margin: 0;
  border-width: 0;
  border-style: solid;
  border-color: var(--grayish-blue-color);
}

.divider--orientation-horizontal {
  border-bottom-width: thin;
}

.divider--orientation-vertical {
  height: 100%;
  border-right-width: thin;
}

.divider--flex-item {
  align-self: stretch;
  height: auto;
}
</style>
