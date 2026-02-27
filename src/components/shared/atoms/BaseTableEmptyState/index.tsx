import React from "react";
import BaseEmptyData from "@/components/shared/atoms/BaseEmptyData";

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
              <BaseEmptyData 
                title={isFiltered ? "No results found" : "No data available"}
                description={isFiltered ? "Try adjusting your search or filter" : ""}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default BaseTableEmptyState;