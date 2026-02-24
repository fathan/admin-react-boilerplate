import React, { FC } from "react";

export interface BaseDividerProps {
  /** Orientation: horizontal / vertical */
  orientation?: "horizontal" | "vertical";
  /** Thickness in pixels */
  thickness?: number;
  /** Tailwind color class (bg-gray-200, bg-gray-300, etc.) */
  colorClass?: string;
  /** Margin / spacing (Tailwind) */
  marginClass?: string;
  /** Additional className */
  className?: string;
  /** Width for vertical divider */
  height?: string | number;
  /** Width for horizontal divider */
  width?: string | number;
}

/**
 * Reusable BaseDivider component using TailwindCSS
 */
const BaseDivider: FC<BaseDividerProps> = ({
  orientation = "horizontal",
  thickness = 1,
  colorClass = "bg-gray-200 dark:bg-gray-700",
  marginClass = "my-4",
  className = "",
  width,
  height,
}) => {
  const baseStyle: React.CSSProperties =
    orientation === "horizontal"
      ? { height: thickness, width: width || "100%" }
      : { width: thickness, height: height || "100%" };

  const dividerClass =
    orientation === "horizontal" ? "w-full" : "h-full";

  return (
    <div
      className={`${colorClass} ${marginClass} ${dividerClass} ${className}`}
      style={baseStyle}
    />
  );
};

export default BaseDivider;