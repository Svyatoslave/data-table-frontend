import type { AvailableColumnSortOptions, ColumnSortOptions } from "./types";

export const isSortableColumn = (
  columnSortOptions: ColumnSortOptions
): columnSortOptions is AvailableColumnSortOptions =>
  columnSortOptions.sortable;
