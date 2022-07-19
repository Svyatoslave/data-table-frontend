import { useRoute } from "vue-router";

export const useParamId = (paramKey = "id"): string => {
  const route = useRoute();

  return route.params[paramKey] as string;
};
