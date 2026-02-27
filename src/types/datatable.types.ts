import { ColumnDef, SortingState, VisibilityState } from "@tanstack/react-table";
import React from "react";

/** ─── Row Action ────────────────────────────────────────────────────────────── */

export interface RowAction<TData> {
  label: string;
  icon?: React.ReactNode;
  colorPalette?: string;
  isDisabled?: (row: TData) => boolean;
  isHidden?: (row: TData) => boolean;
  onClick: (row: TData) => void;
}

/** ─── Server Side Params ─────────────────────────────────────────────────────── */

export interface ServerSideParams {
  page: number;
  pageSize: number;
  search: string;
  sorting: SortingState;
}

export interface ServerSideResult<TData> {
  data: TData[];
  totalRows: number;
}

// ─── Column Definition (extends TanStack ColumnDef) ──────────────────────────

export type DataTableColumnDef<TData> = ColumnDef<TData> & {
  /** Apakah kolom ini bisa di-pin */
  pinnable?: boolean;
  /** Sembunyikan kolom dari visibility toggle */
  hideFromToggle?: boolean;
};

// ─── Main Props ───────────────────────────────────────────────────────────────

export interface AppDataTableProps<TData extends object> {
  /** Data untuk ditampilkan (client-side) */
  data?: TData[];
  /** Column definitions */
  columns: DataTableColumnDef<TData>[];

  // ── Identity ──
  /** Key unik untuk setiap row — untuk checkbox & expand */
  rowKey: keyof TData;

  // ── Features ──
  /** Aktifkan global search */
  searchable?: boolean;
  /** Placeholder search input */
  searchPlaceholder?: string;
  /** Aktifkan sorting per kolom */
  sortable?: boolean;
  /** Aktifkan pagination */
  pagination?: boolean;
  /** Opsi jumlah row per page */
  pageSizeOptions?: number[];
  /** Default page size */
  defaultPageSize?: number;
  /** Aktifkan single row select (radio) */
  selectable?: boolean;
  /** Aktifkan multi row select (checkbox) */
  multiSelect?: boolean;
  /** Aktifkan expandable row */
  expandable?: boolean;
  /** Render konten expanded row */
  renderExpandedRow?: (row: TData) => React.ReactNode;
  /** Row actions (edit, delete, dll) */
  rowActions?: RowAction<TData>[];
  /** Max visible row actions sebelum masuk ke dropdown */
  maxVisibleRowActions?: number;
  /** Aktifkan column visibility toggle */
  columnToggle?: boolean;
  /** Aktifkan export CSV */
  exportCsv?: boolean;
  /** Aktifkan export Pdf */
  exportPdf?: boolean;
  /** Nama file CSV yang diexport */
  exportFilename?: string;
  /** Aktifkan column pinning */
  columnPinning?: boolean;

  // ── Server Side ──
  /** Mode server-side — pagination/sort/search dihandle di luar */
  serverSide?: boolean;
  /** Total rows dari server (untuk pagination) */
  totalRows?: number;
  /** Loading state */
  loading?: boolean;
  /** Callback saat parameter berubah (server-side) */
  onParamsChange?: (params: ServerSideParams) => void;

  // ── Callbacks ──
  /** Callback saat row dipilih */
  onRowSelect?: (rows: TData[]) => void;
  /** Callback saat single row dipilih */
  onRowClick?: (row: TData) => void;

  // ── Appearance ──
  /** Judul tabel */
  title?: string;
  /** Deskripsi di bawah judul */
  description?: string;
  /** Tampilkan border antar row */
  striped?: boolean;
  /** Highlight row saat hover */
  highlightOnHover?: boolean;
  /** Custom empty state */
  emptyState?: React.ReactNode;
  /** Custom class untuk wrapper */
  className?: string;

  // ── Initial State ──
  initialSorting?: SortingState;
  initialColumnVisibility?: VisibilityState;
  initialSearch?: string;

  leftToolbarContent?: React.ReactNode;
  rightToolbarContent?: React.ReactNode;
}