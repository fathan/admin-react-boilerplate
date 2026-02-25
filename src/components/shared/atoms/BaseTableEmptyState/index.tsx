import React from "react";

interface BaseTableEmptyStateProps {
  isFiltered?: boolean;
  colSpan: number;
  custom?: React.ReactNode;
}

const BaseTableEmptyState: React.FC<BaseTableEmptyStateProps> = ({
  isFiltered,
  colSpan,
  custom,
}) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          {custom ?? (
            <>
              <svg
                className="w-12 h-12 text-gray-200 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-sm font-medium text-gray-500">
                {isFiltered ? "No results found" : "No data available"}
              </p>
              {isFiltered && (
                <p className="text-xs text-gray-400 mt-1">
                  Try adjusting your search or filter
                </p>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default BaseTableEmptyState;