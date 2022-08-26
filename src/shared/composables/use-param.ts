import { type Ref, computed, toRef, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { Nullable, Optional } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

export const useNullableParam = (paramKey: string): Nullable<string> => {
  const route = useRoute();

  const param = route.params[paramKey] as string;
  if (param === "") {
    return null;
  }

  return param;
};

export const useNullableParamRef = (
  paramKey: string
): Ref<Nullable<string>> => {
  const route = useRoute();
  const router = useRouter();

  const params = toRef(route, "params");

  return computed<Nullable<string>>({
    get() {
      const param = params.value[paramKey] as Optional<string>;

      return isNonNullable(param) && param !== "" ? param : null;
    },
    set(value) {
      nextTick(() => {
        router.replace({
          params: {
            ...route.params,
            [paramKey]: isNonNullable(value) ? value : "",
          },
        });
      });
    },
  });
};

export const useThrowParam = (paramKey: string): string => {
  const route = useRoute();

  const param = route.params[paramKey] as string;
  if (param === "") {
    throw new Error(`not found param by key "${paramKey}"`);
  }

  return param;
};

export const useThrowParamRef = (paramKey: string): Ref<string> => {
  const route = useRoute();
  const router = useRouter();

  const params = toRef(route, "params");

  return computed<string>({
    get() {
      const param = params.value[paramKey] as string;
      if (!isNonNullable(param) || param === "") {
        throw new Error(`not found param by key "${paramKey}"`);
      }

      return param;
    },
    set(value) {
      nextTick(() => {
        router.replace({
          params: {
            ...route.params,
            [paramKey]: value,
          },
        });
      });
    },
  });
};

export const useParamID = (): string => useThrowParam("id");
