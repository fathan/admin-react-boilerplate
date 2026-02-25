import React from "react";

interface BaseTableSortIconProps {
  direction: "asc" | "desc" | false;
}

const BaseTableSortIcon: React.FC<BaseTableSortIconProps> = ({ direction }) => {
  return (
    <span className="ml-1.5 inline-flex flex-col gap-px">
      <svg
        className={`w-3 h-3 transition-colors ${direction === "asc" ? "text-blue-600" : "text-gray-300"}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 5l8 8H4z" />
      </svg>
      <svg
        className={`w-3 h-3 transition-colors ${direction === "desc" ? "text-blue-600" : "text-gray-300"}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 19l-8-8h16z" />
      </svg>
    </span>
  );
};

export default BaseTableSortIcon;