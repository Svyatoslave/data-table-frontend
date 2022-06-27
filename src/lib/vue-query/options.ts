import type { VueQueryPluginOptions } from "vue-query";
import { queryClient } from "@/lib/vue-query";

export const queryPluginOptions: VueQueryPluginOptions = {
  queryClient: queryClient,
};
