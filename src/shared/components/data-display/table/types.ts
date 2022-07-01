export type RowData = Record<string, unknown>;

export type GetRowKeyFn<T extends RowData> = (
  row: T,
  idx: number
) => string | number;

interface BaseColumn {
  key: string;
  headerName: string;
  width?: string;
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
