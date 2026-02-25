import { CellContext, ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTableColumnDef } from "./datatable.types";

// ─── Column Builder Options ───────────────────────────────────────────────────

export interface ColumnOptions<TData, TValue = unknown> {
  /** Header label (string) */
  header: string;
  /** Lebar kolom dalam pixel */
  size?: number;
  /** Aktifkan sorting untuk kolom ini (default: true) */
  sortable?: boolean;
  /** Sembunyikan kolom dari visibility toggle */
  hideFromToggle?: boolean;
  /** Custom cell renderer */
  cell?: (info: CellContext<TData, TValue>) => React.ReactNode;
  /** Format nilai sebelum ditampilkan (tanpa custom render) */
  format?: (value: TValue, row: TData) => string;
}

// ─── createColumns ────────────────────────────────────────────────────────────

/**
 * Helper untuk membuat column definitions dengan accessor string style.
 * Type-safe: key harus merupakan key yang valid dari TData.
 *
 * @example
 * const columns = createColumns<User>({
 *   id:       { header: "ID",    size: 60 },
 *   name:     { header: "Name" },
 *   email:    { header: "Email" },
 *   role:     { header: "Role",  cell: (info) => <Badge>{info.getValue()}</Badge> },
 *   joinDate: { header: "Joined", format: (v) => new Date(v).toLocaleDateString() },
 * })
 */
export function createColumns<TData extends object>(
  definition: {
    [K in keyof TData]?: ColumnOptions<TData, TData[K]>;
  }
): DataTableColumnDef<TData>[] {
  return (Object.keys(definition) as (keyof TData)[])
    .filter((key) => definition[key] !== undefined)
    .map((key) => {
      const opts = definition[key]!;

      const col: DataTableColumnDef<TData> = {
        id: String(key),
        accessorKey: key as string,
        header: opts.header,
        size: opts.size,
        enableSorting: opts.sortable !== false,
        hideFromToggle: opts.hideFromToggle,
      };

      if (opts.cell) {
        col.cell = opts.cell as ColumnDef<TData>["cell"];
      } else if (opts.format) {
        col.cell = (info) => {
          const value = info.getValue() as TData[typeof key];
          return opts.format!(value, info.row.original);
        };
      }

      return col;
    });
}

// ─── col() — single column shorthand ─────────────────────────────────────────

/**
 * Shorthand untuk satu kolom dengan accessor string.
 * Berguna saat ingin mixin dengan kolom custom.
 *
 * @example
 * const columns = [
 *   col<User>("name",  { header: "Name" }),
 *   col<User>("email", { header: "Email", size: 200 }),
 *   {
 *     id: "custom",
 *     header: "Custom",
 *     cell: () => <span>Custom</span>,
 *   },
 * ]
 */
export function col<TData extends object, K extends keyof TData = keyof TData>(
  key: K,
  opts: ColumnOptions<TData, TData[K]>
): DataTableColumnDef<TData> {
  const column: DataTableColumnDef<TData> = {
    id: String(key),
    accessorKey: key as string,
    header: opts.header,
    size: opts.size,
    enableSorting: opts.sortable !== false,
    hideFromToggle: opts.hideFromToggle,
  };

  if (opts.cell) {
    column.cell = opts.cell as ColumnDef<TData>["cell"];
  } else if (opts.format) {
    column.cell = (info) => {
      const value = info.getValue() as TData[K];
      return opts.format!(value, info.row.original);
    };
  }

  return column;
}