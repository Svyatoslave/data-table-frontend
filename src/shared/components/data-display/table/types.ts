import type { SelectOptions } from "@/shared/types/select";
import type { Nullable } from "@/shared/types/utility";

export type RowData = Record<string, unknown>;

// getters

export type IsDisabledRowFn<T extends RowData> = (
  row: T,
  idx: number
) => boolean;

export type GetRowKeyFn<T extends RowData> = (
  row: T,
  idx: number
) => string | number;

export type GetTooltipRowFn<T extends RowData> = (
  row: T,
  idx: number
) => Nullable<string>;

// sorting

export interface AvailableColumnSortOptions {
  sortable: true;
  sortField: string;
}

export interface NonColumnSortOptions {
  sortable: false;
}

export type ColumnSortOptions =
  | AvailableColumnSortOptions
  | NonColumnSortOptions;

// filtering

export interface NonColumnFilterOptions {
  filterable: false;
}

export interface BaseColumnFilterOptions {
  filterable: true;
  filterField: string;
}

export interface PrimitiveColumnFilterOptions extends BaseColumnFilterOptions {
  filterType: "primitive";
}

export interface CommonColumnFilterOptions extends BaseColumnFilterOptions {
  filterType: "common";
}

export interface MultiSelectColumnFilterOptions
  extends BaseColumnFilterOptions {
  filterType: "multi-select";
  getOptions: () => Promise<SelectOptions<string | number>>;
}

export type AvailableColumnFilterOptions =
  | PrimitiveColumnFilterOptions
  | CommonColumnFilterOptions
  | MultiSelectColumnFilterOptions;

export type ColumnFilterOptions =
  | NonColumnFilterOptions
  | AvailableColumnFilterOptions;

// tooltip

export interface NonColumnTooltipOptions {
  tooltiped: false;
}

export interface AvailableColumnTooltipOptions<T extends RowData> {
  tooltiped: true;
  сomputed: (row: T, idx: number) => string | number;
}

export type ColumnTooltipOptions<T extends RowData> =
  | NonColumnTooltipOptions
  | AvailableColumnTooltipOptions<T>;

// column

export interface TableStandardColumn<T extends RowData> {
  key: string;
  type: "standard";
  field: keyof T;
  headerName: string;
  width: string;
  sortOptions: ColumnSortOptions;
  filterOptions: ColumnFilterOptions;
  tooltipOptions: ColumnTooltipOptions<T>;
}

export interface TableDateColumn<T extends RowData> {
  key: string;
  type: "date";
  field: keyof T;
  format?: string;
  headerName: string;
  width: string;
  sortOptions: ColumnSortOptions;
  filterOptions: ColumnFilterOptions;
  tooltipOptions: ColumnTooltipOptions<T>;
}

export interface TableComputedColumn<T extends RowData> {
  key: string;
  type: "сomputed";
  сomputed: (row: T, idx: number) => string;
  headerName: string;
  width: string;
  sortOptions: ColumnSortOptions;
  filterOptions: ColumnFilterOptions;
  tooltipOptions: ColumnTooltipOptions<T>;
}

export interface TableSlotColumn<T extends RowData> {
  key: string;
  type: "slot";
  slotName: string;
  headerName: string;
  width: string;
  sortOptions: ColumnSortOptions;
  filterOptions: ColumnFilterOptions;
  tooltipOptions: ColumnTooltipOptions<T>;
}

export type TableColumn<T extends RowData> =
  | TableStandardColumn<T>
  | TableDateColumn<T>
  | TableComputedColumn<T>
  | TableSlotColumn<T>;

export type TableColumns<T extends RowData> = TableColumn<T>[];

export interface TableRowCtx<T extends RowData> {
  disabled: boolean;
  row: T;
  idx: number;
  column: TableColumn<T>;
}
