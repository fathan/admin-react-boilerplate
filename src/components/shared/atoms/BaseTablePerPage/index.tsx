import React from "react";

interface BaseTablePerPageProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
  totalCount: number;
}

const BaseTablePerPage: React.FC<BaseTablePerPageProps> = ({
  value,
  options,
  onChange,
  totalCount,
}) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="whitespace-nowrap">Rows per page</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          px-2 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          cursor-pointer
        "
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span className="whitespace-nowrap text-gray-400">of {totalCount}</span>
    </div>
  );
};

export default BaseTablePerPage;