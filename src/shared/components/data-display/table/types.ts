import type { SelectOptions } from "@/shared/types/select";

export type RowData = Record<string, unknown>;

export type GetRowKeyFn<T extends RowData> = (
  row: T,
  idx: number
) => string | number;

export type IsDisabledRowFn<T extends RowData> = (
  row: T,
  idx: number
) => boolean;

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

// column

interface BaseColumn {
  key: string;
  headerName: string;
  width?: string;
  sortOptions: ColumnSortOptions;
  filterOptions: ColumnFilterOptions;
}

export interface TableStandardColumn<T extends RowData> extends BaseColumn {
  type: "standard";
  field: keyof T;
}

export interface TableDateColumn<T extends RowData> extends BaseColumn {
  type: "date";
  field: keyof T;
  format?: string;
}

export interface TableComputedColumn<T extends RowData> extends BaseColumn {
  type: "сomputed";
  сomputed: (row: T, idx: number) => string;
}

export interface TableSlotColumn extends BaseColumn {
  type: "slot";
  slotName: string;
}

export type TableColumn<T extends RowData> =
  | TableStandardColumn<T>
  | TableDateColumn<T>
  | TableComputedColumn<T>
  | TableSlotColumn;

export type TableColumns<T extends RowData> = TableColumn<T>[];

export interface TableRowCtx<T extends RowData> {
  disabled: boolean;
  row: T;
  idx: number;
  column: TableColumn<T>;
}
