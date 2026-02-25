import React from "react";

interface BaseTableLoadingStateProps {
  colSpan: number;
  rows?: number;
}

const BaseTableLoadingState: React.FC<BaseTableLoadingStateProps> = ({
  colSpan,
  rows = 5,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-gray-100">
          {Array.from({ length: colSpan }).map((_, j) => (
            <td key={j} className="px-4 py-3">
              <div
                className="h-4 bg-gray-100 rounded animate-pulse"
                style={{ width: `${60 + Math.random() * 30}%` }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default BaseTableLoadingState;