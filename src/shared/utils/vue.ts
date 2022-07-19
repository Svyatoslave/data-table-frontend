import { Comment, Text, type Slot, type VNode } from "vue";

import type { Optional } from "../types/utility";

export const hasSlotContent = (slot: Optional<Slot>): boolean => {
  if (!slot) return false;

  return slot({}).some((vnode: VNode) => {
    if (vnode.type === Comment) return false;

    if (Array.isArray(vnode.children) && !vnode.children.length) return false;

    return (
      vnode.type !== Text ||
      (typeof vnode.children === "string" && vnode.children.trim() !== "")
    );
  });
};
