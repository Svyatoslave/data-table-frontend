<template>
  <component
    :is="computedTag"
    class="typography"
    :class="[
      `typography--variant-${variant}`,
      { [`typography--uppercase`]: uppercase },
    ]"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type VariantKind =
  | "title1"
  | "title2"
  | "title3"
  | "title4"
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "body5"
  | "body6"
  | "body7"
  | "body8"
  | "body9"
  | "body10"
  | "body11"
  | "button1"
  | "button2"
  | "button3"
  | "button4";

export type VariantMap = Record<VariantKind, string>;

export interface ETypographyProps {
  tag?: string;
  uppercase?: boolean;
  variant?: VariantKind;
  variantMapping?: VariantMap;
}

const props = withDefaults(defineProps<ETypographyProps>(), {
  variant: "body2",
  uppercase: false,
  variantMapping: () => ({
    title1: "h1",
    title2: "h2",
    title3: "h3",
    title4: "h4",
    body1: "span",
    body2: "span",
    body3: "span",
    body4: "span",
    body5: "span",
    body6: "span",
    body7: "span",
    body8: "span",
    body9: "span",
    body10: "span",
    body11: "span",
    button1: "span",
    button2: "span",
    button3: "span",
    button4: "span",
  }),
});

const computedTag = computed(
  (): string => props.tag || props.variantMapping[props.variant]
);
</script>

<style scoped>
.typography {
  margin: 0;
}

.typography--variant-title1 {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}

.typography--variant-title2 {
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
}

.typography--variant-title3 {
  font-weight: 700;
  font-size: 12px;
  line-height: 14.4px;
}

.typography--variant-title4 {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.typography--variant-body1 {
  font-weight: 300;
  font-size: 16px;
  line-height: 19.2px;
}

.typography--variant-body2 {
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
}

.typography--variant-body3 {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
}

.typography--variant-body4 {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
}

.typography--variant-body5 {
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
}

.typography--variant-body6 {
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
}

.typography--variant-body7 {
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
}

.typography--variant-body8 {
  font-weight: 700;
  font-size: 12px;
  line-height: 14.4px;
}

.typography--variant-body9 {
  font-weight: 500;
  font-size: 12px;
  line-height: 14.4px;
}

.typography--variant-body10 {
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
}

.typography--variant-body11 {
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
}

.typography--variant-button1 {
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
}

.typography--variant-button2 {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
}

.typography--variant-button3 {
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
}

.typography--variant-button4 {
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
}

.typography--uppercase {
  text-transform: uppercase;
}
</style>
