import { Table } from "@tanstack/react-table";

import BaseTablePerPage from "@/components/shared/atoms/BaseTablePerPage";
import BaseTablePagination from "@/components/shared/atoms/BaseTablePagination";

interface UIDataTablePaginationProps<TData> {
  table: Table<TData>;
  totalCount: number;
  pagination?: boolean;
  pageSizeOptions?: number[];
  serverSide?: boolean;
}

function UIDataTablePagination<TData>({
  table,
  totalCount,
  pagination,
  pageSizeOptions = [10, 25, 50, 100],
  // serverSide,
}: UIDataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();

  const from = totalCount === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-gray-100">
      {/* Range info */}
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-medium text-gray-700">{from}–{to}</span>{" "}
        of{" "}
        <span className="font-medium text-gray-700">{totalCount}</span>{" "}
        results
      </p>

      <div className="flex flex-row items-center gap-3">
        {/* Page size selector */}
        {pagination && (
          <BaseTablePerPage
            value={table.getState().pagination.pageSize}
            options={pageSizeOptions}
            onChange={(size) => table.setPageSize(size)}
            totalCount={totalCount}
          />
        )}

        {/* Pagination controls */}
        <BaseTablePagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          onFirstPage={() => table.setPageIndex(0)}
          onPreviousPage={() => table.previousPage()}
          onNextPage={() => table.nextPage()}
          onLastPage={() => table.setPageIndex(pageCount - 1)}
          onGoToPage={(page) => table.setPageIndex(page)}
        />
      </div>
    </div>
  );
}

export default UIDataTablePagination;