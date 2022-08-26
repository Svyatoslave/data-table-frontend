<template>
  <VToastContainer :toasts="toasts"> </VToastContainer>
  <slot></slot>
</template>

<script setup lang="ts">
import { useToastState, useProvideToast, VToastContainer } from "@/lib/toast";

const { toasts, createToast } = useToastState();

useProvideToast(createToast);
</script>
