<template>
  <div class="initial-spin">
    <RosnedraIcon :size="50" />
    <RosgeolfondIcon :size="50" />
  </div>
</template>

<script setup lang="ts">
import { RosnedraIcon, RosgeolfondIcon } from "@/shared/components/icons";
</script>

<style scoped>
.initial-spin {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100vw;
  height: 100vh;
}
</style>
