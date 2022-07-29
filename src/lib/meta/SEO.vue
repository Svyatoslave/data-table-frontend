<template>
  <Head>
    <title>{{ title }}</title>
  </Head>
  <slot></slot>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Head } from "@vueuse/head";

import { createHeadTitle } from "@/shared/utils/meta";

export interface SEOProps {
  title: string;
}

const props = defineProps<SEOProps>();

const title = computed<string>(() => createHeadTitle(props.title));
</script>
