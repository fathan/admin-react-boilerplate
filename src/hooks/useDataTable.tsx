import {
  ColumnFiltersState,
  ColumnPinningState,
  ExpandedState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppDataTableProps, DataTableColumnDef, ServerSideParams } from "@/types/datatable.types";

export function useDataTable<TData extends object>({
  data = [],
  columns,
  rowKey,
  searchable,
  sortable,
  pagination,
  defaultPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  selectable,
  multiSelect,
  expandable,
  serverSide,
  totalRows,
  loading,
  onParamsChange,
  onRowSelect,
  initialSorting = [],
  initialColumnVisibility = {},
  initialSearch = "",
}: AppDataTableProps<TData>) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [globalFilter, setGlobalFilter] = useState(initialSearch);
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [pagination_, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  // Debounce search untuk server-side
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout>>();

  // ── Build columns dengan checkbox & expand ─────────────────────────────────
  const builtColumns = useMemo(() => {
    const result: DataTableColumnDef<TData>[] = [];

    // Expand column
    if (expandable) {
      result.push({
        id: "__expand__",
        header: () => null,
        size: 48,
        enableSorting: false,
        hideFromToggle: true,
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                row.toggleExpanded();
              }}
              className="flex items-center justify-center w-7 h-7 rounded-md transition-colors hover:bg-gray-100"
              aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
            >
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  row.getIsExpanded() ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : null,
      });
    }

    // Checkbox column
    if (multiSelect) {
      result.push({
        id: "__select__",
        size: 48,
        enableSorting: false,
        hideFromToggle: true,
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            ref={(el) => {
              if (el) el.indeterminate = table.getIsSomePageRowsSelected();
            }}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer disabled:opacity-40"
            aria-label="Select row"
          />
        ),
      });
    } else if (selectable) {
      result.push({
        id: "__select__",
        size: 48,
        enableSorting: false,
        hideFromToggle: true,
        header: () => null,
        cell: ({ row }) => (
          <input
            type="radio"
            checked={row.getIsSelected()}
            onChange={() => {
              setRowSelection({ [row.id]: true });
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 border-gray-300 text-blue-600 cursor-pointer"
            aria-label="Select row"
          />
        ),
      });
    }

    return [...result, ...columns];
  }, [columns, expandable, multiSelect, selectable]);

  // ── TanStack Table instance ────────────────────────────────────────────────
  const table = useReactTable<TData>({
    data,
    columns: builtColumns,
    state: {
      globalFilter,
      sorting,
      columnFilters,
      columnVisibility,
      columnPinning,
      rowSelection,
      expanded,
      pagination: pagination_,
    },
    // Untuk server-side: nonaktifkan processing di client
    manualPagination: serverSide,
    manualSorting: serverSide,
    manualFiltering: serverSide,
    pageCount: serverSide && totalRows != null
      ? Math.ceil(totalRows / pagination_.pageSize)
      : undefined,
    getRowId: (row) => String(row[rowKey]),
    getRowCanExpand: () => !!expandable,
    enableRowSelection: multiSelect || selectable,
    enableMultiRowSelection: multiSelect,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: sortable && !serverSide ? getSortedRowModel() : undefined,
    getFilteredRowModel: searchable && !serverSide ? getFilteredRowModel() : undefined,
    getPaginationRowModel: pagination && !serverSide ? getPaginationRowModel() : undefined,
    getExpandedRowModel: expandable ? getExpandedRowModel() : undefined,
  });

  // ── Notify parent saat row selection berubah ───────────────────────────────
  useEffect(() => {
    if (!onRowSelect) return;
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((r) => r.original);
    onRowSelect(selectedRows);
  }, [rowSelection]);

  // ── Server-side: notify parent saat params berubah ────────────────────────
  useEffect(() => {
    if (!serverSide || !onParamsChange) return;

    clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      onParamsChange({
        page: pagination_.pageIndex + 1,
        pageSize: pagination_.pageSize,
        search: globalFilter,
        sorting,
      });
    }, 300);

    return () => clearTimeout(searchDebounceRef.current);
  }, [pagination_.pageIndex, pagination_.pageSize, globalFilter, sorting, serverSide]);

  // ── Export CSV ─────────────────────────────────────────────────────────────
  const exportCsv = useCallback(
    (filename = "export.csv") => {
      const visibleColumns = table
        .getAllColumns()
        .filter(
          (col) =>
            col.getIsVisible() &&
            !["__select__", "__expand__", "__actions__"].includes(col.id)
        );

      const headers = visibleColumns
        .map((col) => {
          const header = col.columnDef.header;
          return typeof header === "string" ? header : col.id;
        })
        .join(",");

      const rows = table.getFilteredRowModel().rows.map((row) =>
        visibleColumns
          .map((col) => {
            const cell = row
              .getAllCells()
              .find((c) => c.column.id === col.id);
            const val = cell?.getValue();
            const str = val == null ? "" : String(val);
            return str.includes(",") ? `"${str}"` : str;
          })
          .join(",")
      );

      const csv = [headers, ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    },
    [table]
  );

  // ── Computed values ────────────────────────────────────────────────────────
  const selectedCount = Object.keys(rowSelection).length;
  const totalCount = serverSide ? (totalRows ?? 0) : table.getFilteredRowModel().rows.length;

  return {
    table,
    globalFilter,
    setGlobalFilter,
    selectedCount,
    totalCount,
    exportCsv,
    pagination: pagination_,
    setPagination,
  };
}