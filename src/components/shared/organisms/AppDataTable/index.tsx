import BaseTableEmptyState from "@/components/shared/atoms/BaseTableEmptyState";
import BaseTableLoadingState from "@/components/shared/atoms/BaseTableLoadingState";
import { useDataTable } from "@/hooks/useDataTable";
import UIDataTableHeader from "@/components/shared/molecules/UIDataTableHeader";
import UIDataTablePagination from "@/components/shared/molecules/UIDataTablePagination";
import UIDataTableRow from "@/components/shared/molecules/UIDataTableRow";
import UIDataTableToolbar from "@/components/shared/molecules/UIDataTableToolbar";
import { AppDataTableProps } from "@/types/datatable.types";

/**
 * AppDataTable
 *
 * Organism: Reusable datatable dengan TanStack Table v8.
 * Fitur: search, sort, pagination, per page, expandable row,
 *        checkbox single/multi, column toggle, export CSV,
 *        column pinning, row actions, server-side support.
 *
 * @example
 * <AppDataTable
 *   data={users}
 *   columns={columns}
 *   rowKey="id"
 *   searchable
 *   sortable
 *   pagination
 *   multiSelect
 *   expandable
 *   columnToggle
 *   exportCsv
 *   rowActions={[
 *     { label: "Edit", onClick: (row) => handleEdit(row) },
 *     { label: "Delete", colorPalette: "red", onClick: (row) => handleDelete(row) },
 *   ]}
 *   renderExpandedRow={(row) => <div>{row.detail}</div>}
 *   onRowSelect={(rows) => console.log(rows)}
 * />
 */
function AppDataTable<TData extends object>(props: AppDataTableProps<TData>) {
  const {
    title,
    description,
    // columns,
    // selectable,
    // multiSelect,
    searchable,
    searchPlaceholder,
    sortable,
    pagination,
    pageSizeOptions = [10, 25, 50, 100],
    expandable,
    renderExpandedRow,
    rowActions = [],
    maxVisibleRowActions = 2,
    columnToggle,
    exportCsv,
    exportPdf,
    exportFilename,
    columnPinning,
    serverSide,
    loading,
    striped,
    highlightOnHover,
    emptyState,
    className,
    onRowClick,
  } = props;

  const {
    table,
    globalFilter,
    setGlobalFilter,
    selectedCount,
    totalCount,
    exportCsv: handleExportCsv,
    exportPdf: handleExportPdf,
  } = useDataTable(props);

  const rows = table.getRowModel().rows;
  const hasActions = rowActions.length > 0;
  const totalColSpan =
    table.getVisibleLeafColumns().length + (hasActions ? 1 : 0);
  const isFiltered = globalFilter.length > 0;

  return (
    <div className={`flex flex-col gap-4 ${className ?? ""}`}>
      {/* Toolbar */}
      {(title || description || searchable || columnToggle || exportCsv || pagination) && (
        <UIDataTableToolbar
          table={table}
          title={title}
          description={description}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          searchable={searchable}
          searchPlaceholder={searchPlaceholder}
          columnToggle={columnToggle}
          exportCsv={exportCsv}
          exportPdf={exportPdf}
          exportFilename={exportFilename}
          onExportCsv={() => handleExportCsv(exportFilename ?? "document.csv")}
          onExportPdf={() => handleExportPdf(exportFilename ?? "document.pdf")}
          pagination={pagination}
          pageSizeOptions={pageSizeOptions}
          totalCount={totalCount}
          selectedCount={selectedCount}
          onClearSelection={() => table.resetRowSelection()}
        />
      )}

      {/* Table */}
      <div className="relative rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header */}
            <UIDataTableHeader
              table={table}
              sortable={sortable}
              columnPinning={columnPinning}
            />

            {/* Body */}
            <tbody>
              {loading ? (
                <BaseTableLoadingState colSpan={totalColSpan} rows={5} />
              ) : rows.length === 0 ? (
                <BaseTableEmptyState
                  colSpan={totalColSpan}
                  isFiltered={isFiltered}
                  custom={emptyState}
                />
              ) : (
                rows.map((row) => (
                  <UIDataTableRow
                    key={row.id}
                    row={row}
                    striped={striped}
                    highlightOnHover={highlightOnHover}
                    expandable={expandable}
                    renderExpandedRow={renderExpandedRow}
                    rowActions={rowActions}
                    maxVisibleRowActions={maxVisibleRowActions}
                    onRowClick={onRowClick}
                    columnCount={totalColSpan}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Loading overlay (server-side refetch) */}
        {loading && rows.length > 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Pagination footer */}
      {pagination && (
        <UIDataTablePagination
          table={table}
          pagination={pagination}
          pageSizeOptions={pageSizeOptions}
          totalCount={totalCount}
          serverSide={serverSide}
        />
      )}
    </div>
  );
}

export default AppDataTable;