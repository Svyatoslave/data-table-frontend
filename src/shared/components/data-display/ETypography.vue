<template>
  <component
    :is="computedTag"
    class="typography"
    :class="[
      `typography--variant-${variant}`,
      { [`typography--uppercase`]: uppercase },
    ]"
    ><slot></slot
  ></component>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type VariantKind =
  | "title2"
  | "title3"
  | "title4"
  | "body2"
  | "body3"
  | "body4";

export type VariantMap = Record<VariantKind, string>;

export interface ETypographyProps {
  tag?: string;
  uppercase?: boolean;
  variant: VariantKind;
  variantMapping?: VariantMap;
}

const props = withDefaults(defineProps<ETypographyProps>(), {
  variant: "body2",
  uppercase: false,
  variantMapping: () => ({
    title2: "h2",
    title3: "h3",
    title4: "h4",
    body2: "span",
    body3: "span",
    body4: "span",
  }),
});

const computedTag = computed(
  (): string => props.tag || props.variantMapping[props.variant]
);
</script>

<style>
.typography {
  margin: 0;
}

.typography--variant-title2 {
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
}

.typography--variant-title3 {
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
}

.typography--variant-title4 {
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.05em;
}

.typography--variant-body2 {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}

.typography--variant-body3 {
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
}

.typography--variant-body4 {
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
}

.typography--uppercase {
  text-transform: uppercase;
}
</style>
