<template>
  <VConfirmContainer :confirm="confirm" :clear-confirm="clearConfirm" />
  <slot></slot>
</template>

<script setup lang="ts">
import {
  useConfirmState,
  useProvideConfirm,
  VConfirmContainer,
} from "@/lib/confirm";

const { confirm, setConfirm, clearConfirm } = useConfirmState();

useProvideConfirm(setConfirm);
</script>
