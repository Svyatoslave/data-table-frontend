import type { SelectOptions } from "../types/select";

export const getValuesFromSelect = <T>(selectOptions: SelectOptions<T>): T[] =>
  selectOptions.map(({ value }) => value);
