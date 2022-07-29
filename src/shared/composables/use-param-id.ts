import { useRoute } from "vue-router";

export const useParamID = (paramKey = "id"): string => {
  const route = useRoute();

  return route.params[paramKey] as string;
};
