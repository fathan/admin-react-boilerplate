import { Row, flexRender } from "@tanstack/react-table";
import React, { useRef, useState } from "react";
import { RowAction } from "@/types/datatable.types";

interface UIDataTableRowProps<TData> {
  row: Row<TData>;
  striped?: boolean;
  highlightOnHover?: boolean;
  expandable?: boolean;
  renderExpandedRow?: (row: TData) => React.ReactNode;
  rowActions?: RowAction<TData>[];
  maxVisibleRowActions?: number;
  onRowClick?: (row: TData) => void;
  columnCount: number;
}

function UIDataTableRow<TData>({
  row,
  striped,
  highlightOnHover = true,
  expandable,
  renderExpandedRow,
  rowActions = [],
  maxVisibleRowActions = 2,
  onRowClick,
  columnCount,
}: UIDataTableRowProps<TData>) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const visibleActions = rowActions
    .filter((a) => !a.isHidden?.(row.original))
    .filter((_, i) => i < maxVisibleRowActions);

  const overflowActions = rowActions
    .filter((a) => !a.isHidden?.(row.original))
    .filter((_, i) => i >= maxVisibleRowActions);

  const isSelected = row.getIsSelected();
  const isExpanded = row.getIsExpanded();

  return (
    <>
      <tr
        onClick={() => onRowClick?.(row.original)}
        className={`
          border-b border-gray-100 transition-colors
          ${striped && row.index % 2 !== 0 ? "bg-gray-50/60" : "bg-white"}
          ${highlightOnHover ? "hover:bg-blue-50/40" : ""}
          ${isSelected ? "bg-blue-50 hover:bg-blue-50" : ""}
          ${onRowClick ? "cursor-pointer" : ""}
        `}
      >
        {row.getVisibleCells().map((cell) => {
          const isPinned = cell.column.getIsPinned();
          return (
            <td
              key={cell.id}
              style={{
                width: cell.column.getSize(),
                position: isPinned ? "sticky" : undefined,
                left: isPinned === "left" ? `${cell.column.getStart("left")}px` : undefined,
                right: isPinned === "right" ? `${cell.column.getAfter("right")}px` : undefined,
                zIndex: isPinned ? 1 : undefined,
                backgroundColor: isPinned ? (isSelected ? "#eff6ff" : "white") : undefined,
              }}
              className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}

        {/* Row Actions */}
        {rowActions.length > 0 && (
          <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-end gap-1">
              {/* Visible actions */}
              {visibleActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => action.onClick(row.original)}
                  disabled={action.isDisabled?.(row.original)}
                  title={action.label}
                  className={`
                    flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium
                    transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
                    ${action.colorPalette === "red"
                      ? "text-white bg-red-600 hover:bg-red-500"
                      : action.colorPalette === "green"
                      ? "text-white bg-green-600 hover:bg-green-500"
                      : action.colorPalette === "yellow"
                      ? "text-white bg-yellow-500 hover:bg-yellow-600"
                      : "text-white bg-gray-600 hover:bg-gray-500"
                    }
                  `}
                >
                  {action.icon && <span className="w-3.5 h-3.5">{action.icon}</span>}
                  {action.label}
                </button>
              ))}

              {/* Overflow dropdown */}
              {overflowActions.length > 0 && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                      <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                        {overflowActions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              action.onClick(row.original);
                              setDropdownOpen(false);
                            }}
                            disabled={action.isDisabled?.(row.original)}
                            className={`
                              w-full flex items-center gap-2.5 px-3 py-2 text-sm
                              transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                              ${action.colorPalette === "red"
                                ? "text-red-600 hover:bg-red-50"
                                : "text-gray-700 hover:bg-gray-50"
                              }
                            `}
                          >
                            {action.icon && <span>{action.icon}</span>}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </td>
        )}
      </tr>

      {/* Expanded Row */}
      {expandable && isExpanded && renderExpandedRow && (
        <tr className="bg-blue-50/30 border-b border-blue-100">
          <td colSpan={columnCount} className="px-6 py-4">
            {renderExpandedRow(row.original)}
          </td>
        </tr>
      )}
    </>
  );
}

export default UIDataTableRow;