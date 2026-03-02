import { useRef, useState } from "react";
import { Button, Menu, Portal } from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";

import { DataTableColumnDef } from "@/types/datatable.types";

// import BaseTablePerPage from "@/components/shared/atoms/BaseTablePerPage";
import BaseTableSearchInput from "@/components/shared/atoms/BaseTableSearchInput";
import { LuDownload } from "react-icons/lu";
import { Columns } from "lucide-react";

interface UIDataTableToolbarProps<TData> {
  table: Table<TData>;
  title?: string;
  description?: string;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  columnToggle?: boolean;
  exportCsv?: boolean;
  exportPdf?: boolean;
  exportFilename?: string;
  onExportCsv?: () => void;
  onExportPdf?: () => void;
  pagination?: boolean;
  pageSizeOptions?: number[];
  totalCount: number;
  selectedCount: number;
  onClearSelection?: () => void;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

function UIDataTableToolbar<TData>({
  table,
  title,
  description,
  globalFilter,
  onGlobalFilterChange,
  searchable,
  searchPlaceholder,
  columnToggle,
  exportCsv,
  exportPdf,
  onExportCsv,
  onExportPdf,
  // pagination,
  // pageSizeOptions = [10, 25, 50, 100],
  // totalCount,
  selectedCount,
  leftContent,
  rightContent,
  onClearSelection,
}: UIDataTableToolbarProps<TData>) {
  const [columnToggleOpen, setColumnToggleOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const toggleableColumns = table
    .getAllColumns()
    .filter(
      (col) =>
        col.getCanHide() &&
        !(col.columnDef as DataTableColumnDef<TData>).hideFromToggle
    );

  return (
    <div className="space-y-3">
      {/* Title & Description */}
      {(title || description) && (
        <div className="mb-7">
          {title && <h2 className="text-base font-semibold text-gray-800">{title}</h2>}
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
      )}

      {/* Toolbar Row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Left: search */}
        <div className="flex items-center gap-2 flex-wrap">
          {searchable && (
            <BaseTableSearchInput
              value={globalFilter}
              onChange={onGlobalFilterChange}
              placeholder={searchPlaceholder}
            />
          )}

          {/* Selected badge */}
          {selectedCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{selectedCount} selected</span>
              <button
                onClick={onClearSelection}
                className="ml-1 text-blue-400 hover:text-blue-600 transition-colors"
                aria-label="Clear selection"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {leftContent}
        </div>

        {/* Right: per page + column toggle + export */}
        <div className="flex items-center gap-2">
          {/* {pagination && (
            <BaseTablePerPage
              value={table.getState().pagination.pageSize}
              options={pageSizeOptions}
              onChange={(size) => table.setPageSize(size)}
              totalCount={totalCount}
            />
          )} */}
          {rightContent}

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="subtle" colorPalette="blue">
                <LuDownload className="mr-2" />
                Export
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel>Export</Menu.ItemGroupLabel>
                    {exportCsv && (<Menu.Item value="csv" onClick={onExportCsv}>CSV</Menu.Item>)}
                    {exportPdf && (<Menu.Item value="pdf" onClick={onExportPdf}>PDF</Menu.Item>)}
                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

           {/* Column Toggle */}
          {columnToggle && (
            <div className="relative" ref={toggleRef}>
              <Button
                onClick={() => setColumnToggleOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors"
              >
                <Columns className="w-4 h-4" />
                Columns
              </Button>

              {columnToggleOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setColumnToggleOpen(false)}
                  />
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1.5 overflow-hidden">
                    <div className="px-3 py-1.5 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Visible Columns
                      </span>
                      <button
                        onClick={() => table.resetColumnVisibility()}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Reset
                      </button>
                    </div>
                    {toggleableColumns.map((col) => (
                      <label
                        key={col.id}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={col.getIsVisible()}
                          onChange={col.getToggleVisibilityHandler()}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {typeof col.columnDef.header === "string"
                            ? col.columnDef.header
                            : col.id}
                        </span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UIDataTableToolbar;