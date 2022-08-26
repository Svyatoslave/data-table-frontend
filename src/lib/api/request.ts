import { pascalCase } from "change-case";

import type { Nullable } from "@/shared/types/utility";
import { isNonNullable } from "@/shared/utils/equal";

// pagination

export interface PaginationPayload {
  page: number;
}

interface PaginationDto {
  NumberPages: number;
}

export const mapPaginationToDto = (
  pagination: PaginationPayload
): PaginationDto => ({
  NumberPages: pagination.page,
});

// sorting

export type SortOrderPayload = "asc" | "decs";

export interface SortPayload {
  field: Nullable<string>;
  order: Nullable<SortOrderPayload>;
}

type SortOrderDto = 1 | 2;

interface SortDto {
  SortFieldBy?: string;
  SortOrderBy?: SortOrderDto;
}

const mapSortOrderToDto = (order: SortOrderPayload): SortOrderDto => {
  switch (order) {
    case "asc":
      return 1;
    case "decs":
      return 2;
  }
};

export const mapSortToDto = (sort: SortPayload): SortDto => ({
  ...(isNonNullable(sort.field) && {
    SortApplicationFormFieldBy: sort.field,
  }),
  ...(isNonNullable(sort.order) && {
    SortOrderBy: mapSortOrderToDto(sort.order),
  }),
});

// filtering

interface PrimitiveFilterPayload {
  type: "primitive";
  value: string;
}

type TypeSearchPayload =
  | "contain"
  | "notContain"
  | "equal"
  | "notEqual"
  | "startWith"
  | "endWith";

type ComparisonAndOrPayload = 0 | 1;

interface CommonFilterPayload {
  type: "common";
  firstSearchField: {
    typeSearch: TypeSearchPayload;
    searchText?: string;
  };
  comparisonAndOr: ComparisonAndOrPayload;
  secondSearchField: {
    typeSearch: TypeSearchPayload;
    searchText?: string;
  };
}

export interface MultiSelectFilterPayload {
  type: "multiSelect";
  values: (string | number)[];
}

export interface DateRangeFilterPayload {
  type: "dateRange";
  to: Date;
  from: Date;
}

export type FilterPayload =
  | PrimitiveFilterPayload
  | CommonFilterPayload
  | MultiSelectFilterPayload
  | DateRangeFilterPayload;

export type FiltersPayload = Record<string, FilterPayload>;

export type TypeSearchDto =
  | "Contain"
  | "NotContain"
  | "Equal"
  | "NotEqual"
  | "StartWith"
  | "EndWith";

type ComparisonAndOrDto = "true" | "false";

export type FiltersDto = Record<string, string | number | (string | number)[]>;

const mapPrimitiveFilterToDto = (
  filterField: string,
  filter: PrimitiveFilterPayload
): FiltersDto => ({
  [pascalCase(filterField)]: filter.value,
});

const mapTypeSearchToDto = (typeSearch: TypeSearchPayload): TypeSearchDto => {
  switch (typeSearch) {
    case "contain":
      return "Contain";
    case "notContain":
      return "NotContain";
    case "equal":
      return "Equal";
    case "notEqual":
      return "NotEqual";
    case "startWith":
      return "StartWith";
    case "endWith":
      return "EndWith";
  }
};

const mapComparisonAndOrToDto = (
  comparisonAndOr: ComparisonAndOrPayload
): ComparisonAndOrDto => {
  switch (comparisonAndOr) {
    case 0:
      return "false";
    case 1:
      return "true";
  }
};

const mapCommonFilterToDto = (
  filterField: string,
  filter: CommonFilterPayload
): FiltersDto => ({
  [`${pascalCase(filterField)}.FirstSearchField.TypeSearch`]:
    mapTypeSearchToDto(filter.firstSearchField.typeSearch),
  ...(isNonNullable(filter.firstSearchField.searchText) && {
    [`${pascalCase(filterField)}.FirstSearchField.SearchText`]:
      filter.firstSearchField.searchText,
  }),
  [`${pascalCase(filterField)}.ComparisonAndOr`]: mapComparisonAndOrToDto(
    filter.comparisonAndOr
  ),
  [`${pascalCase(filterField)}.SecondSearchField.TypeSearch`]:
    mapTypeSearchToDto(filter.secondSearchField.typeSearch),
  ...(isNonNullable(filter.secondSearchField.searchText) && {
    [`${pascalCase(filterField)}.SecondSearchField.SearchText`]:
      filter.secondSearchField.searchText,
  }),
});

const mapMultiSelectFilterToDto = (
  filterField: string,
  filter: MultiSelectFilterPayload
): FiltersDto => ({
  [pascalCase(filterField)]: filter.values,
});

const mapDateRangeFilterToDto = (
  filterField: string,
  filter: DateRangeFilterPayload
): FiltersDto => ({
  [`From${pascalCase(filterField)}`]: mapDateToDto(filter.from),
  [`To${pascalCase(filterField)}`]: mapDateToDto(filter.to),
});

export const mapFiltersToDto = (filters: FiltersPayload): FiltersDto =>
  Object.entries(filters).reduce((acc, [filterField, filter]) => {
    switch (filter.type) {
      case "primitive":
        return { ...acc, ...mapPrimitiveFilterToDto(filterField, filter) };
      case "common":
        return { ...acc, ...mapCommonFilterToDto(filterField, filter) };
      case "multiSelect":
        return { ...acc, ...mapMultiSelectFilterToDto(filterField, filter) };
      case "dateRange":
        return { ...acc, ...mapDateRangeFilterToDto(filterField, filter) };
      default:
        return acc;
    }
  }, {});

// other

export const mapDateToDto = (date: Date) => date.toISOString();
