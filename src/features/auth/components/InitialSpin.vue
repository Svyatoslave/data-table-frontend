<template>
  <div class="initial-spin"><ETPIcon :size="200" /></div>
</template>

<script setup lang="ts">
import { ETPIcon } from "@/shared/components/icons";
</script>

<style scoped>
.initial-spin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
