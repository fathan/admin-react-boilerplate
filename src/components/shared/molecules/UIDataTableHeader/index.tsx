import { Header, Table, flexRender } from "@tanstack/react-table";
import React from "react";
import BaseTableSortIcon from "@/components/shared/atoms/BaseTableSortIcon";

interface UIDataTableHeaderProps<TData> {
  table: Table<TData>;
  sortable?: boolean;
  columnPinning?: boolean;
}

function UIDataTableHeader<TData>({
  table,
  sortable,
  columnPinning,
}: UIDataTableHeaderProps<TData>) {
  const getPinStyle = (header: Header<TData, unknown>): React.CSSProperties => {
    const col = header.column;
    if (!col.getIsPinned()) return {};
    return {
      position: "sticky",
      left: col.getIsPinned() === "left" ? `${col.getStart("left")}px` : undefined,
      right: col.getIsPinned() === "right" ? `${col.getAfter("right")}px` : undefined,
      zIndex: 1,
      backgroundColor: "white",
    };
  };

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="border-b-2 border-gray-100">
          {headerGroup.headers.map((header) => {
            const canSort = sortable && header.column.getCanSort();
            const sorted = header.column.getIsSorted();
            const isPinned = header.column.getIsPinned();

            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{
                  width: header.getSize(),
                  ...getPinStyle(header),
                }}
                className={`
                  px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider
                  select-none whitespace-nowrap
                  ${isPinned ? "shadow-sm" : ""}
                  ${canSort ? "cursor-pointer hover:text-gray-700 hover:bg-gray-50 transition-colors" : ""}
                `}
              >
                <div className="flex items-center gap-1 group">
                  {header.isPlaceholder ? null : (
                    <>
                      <span
                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                        className="flex items-center gap-1"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && <BaseTableSortIcon direction={sorted} />}
                      </span>

                      {/* Pin button */}
                      {columnPinning && !["__select__", "__expand__", "__actions__"].includes(header.column.id) && (
                        <button
                          onClick={() => {
                            if (isPinned) {
                              header.column.pin(false);
                            } else {
                              header.column.pin("left");
                            }
                          }}
                          className={`
                            ml-auto opacity-0 group-hover:opacity-100 transition-opacity
                            w-5 h-5 rounded flex items-center justify-center
                            ${isPinned ? "opacity-100 text-blue-500" : "text-gray-300 hover:text-gray-500"}
                          `}
                          title={isPinned ? "Unpin column" : "Pin column left"}
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}

export default UIDataTableHeader;