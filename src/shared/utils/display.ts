import { dayjs } from "@/lib/day-js";
import type { Nullable, Optional } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

export const NO_DATA = "Нет данных";

export const displayNullableData = <T>(
  data: Nullable<T> | Optional<T>
): T | string => (isNonNullable(data) ? data : NO_DATA);

export const displayDate = (
  date: Nullable<Date> | Optional<Date>,
  format = "DD.MM.YY HH:mm"
): string => (isNonNullable(date) ? dayjs(date).format(format) : NO_DATA);
