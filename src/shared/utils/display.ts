import type { Nullable, Optional } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

export const displayNullableData = <T>(
  data: Nullable<T> | Optional<T>
): T | string => (isNonNullable(data) ? data : "Нет данных");
