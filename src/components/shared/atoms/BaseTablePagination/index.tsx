import React from "react";

interface BaseTablePaginationProps {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
  onGoToPage: (page: number) => void;
}

const BaseTablePagination: React.FC<BaseTablePaginationProps> = ({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
  onGoToPage,
}) => {
  const currentPage = pageIndex + 1;

  // Buat range halaman yang ditampilkan
  const getPages = () => {
    if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", pageCount];
    if (currentPage >= pageCount - 3) return [1, "...", pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", pageCount];
  };

  const btnBase = "w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all";
  const btnActive = "bg-blue-600 text-white font-semibold shadow-sm";
  const btnDefault = "text-gray-600 hover:bg-gray-100";
  const btnDisabled = "text-gray-300 cursor-not-allowed";
  // const btnIcon = `${btnBase} ${btnDefault}`;

  return (
    <div className="flex items-center gap-1">
      {/* First */}
      <button
        onClick={onFirstPage}
        disabled={!canPreviousPage}
        className={`${btnBase} ${!canPreviousPage ? btnDisabled : btnDefault}`}
        aria-label="First page"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Previous */}
      <button
        onClick={onPreviousPage}
        disabled={!canPreviousPage}
        className={`${btnBase} ${!canPreviousPage ? btnDisabled : btnDefault}`}
        aria-label="Previous page"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page numbers */}
      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm select-none">
            ···
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onGoToPage((page as number) - 1)}
            className={`${btnBase} ${currentPage === page ? btnActive : btnDefault}`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={onNextPage}
        disabled={!canNextPage}
        className={`${btnBase} ${!canNextPage ? btnDisabled : btnDefault}`}
        aria-label="Next page"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Last */}
      <button
        onClick={onLastPage}
        disabled={!canNextPage}
        className={`${btnBase} ${!canNextPage ? btnDisabled : btnDefault}`}
        aria-label="Last page"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M6 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default BaseTablePagination;