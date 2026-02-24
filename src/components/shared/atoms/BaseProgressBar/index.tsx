import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { useProgress } from "./useProgressBar";
import ProgressTooltip from "./progressTooltip";

type Variant = "primary" | "success" | "warning" | "danger";
type Size = "sm" | "md" | "lg";

interface BaseProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: Size;
  variant?: Variant;
  striped?: boolean;
  animated?: boolean;
  showLabel?: boolean;
  rounded?: boolean;
  gradient?: boolean;
  customColor?: string;
  indeterminate?: boolean;
  tooltip?: boolean;
}

const sizeMap: Record<Size, string> = {
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
};

const variantMap: Record<Variant, string> = {
  primary: "bg-blue-500 dark:bg-blue-400",
  success: "bg-green-500 dark:bg-green-400",
  warning: "bg-yellow-500 dark:bg-yellow-400",
  danger: "bg-red-500 dark:bg-red-400",
};

const BaseProgressBar = forwardRef<HTMLDivElement, BaseProgressBarProps>(
  (
    {
      value = 0,
      max = 100,
      size = "md",
      variant = "primary",
      striped = false,
      animated = true,
      showLabel = false,
      rounded = true,
      gradient = false,
      customColor,
      indeterminate = false,
      tooltip = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const { percentage } = useProgress({ value, max, indeterminate });

    const baseColor = customColor
      ? customColor
      : variantMap[variant];

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={`relative w-full ${className}`}
        {...props}
      >
        <div
          className={`w-full bg-gray-200 dark:bg-gray-700 overflow-hidden ${
            sizeMap[size]
          } ${rounded ? "rounded-full" : ""}`}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: indeterminate ? "100%" : `${percentage}%`,
              x: indeterminate ? ["-100%", "100%"] : 0,
            }}
            transition={{
              duration: indeterminate ? 1.2 : 0.6,
              repeat: indeterminate ? Infinity : 0,
              ease: "easeInOut",
            }}
            className={`
              ${sizeMap[size]}
              ${rounded ? "rounded-full" : ""}
              ${striped ? "bg-[length:1rem_1rem]" : ""}
              ${gradient ? "bg-gradient-to-r from-blue-400 to-blue-600" : ""}
              ${!gradient && !customColor ? baseColor : ""}
              flex items-center justify-center
              text-white text-xs font-semibold
            `}
            style={{
              backgroundColor: customColor || undefined,
              backgroundImage: striped
                ? "linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)"
                : undefined,
            }}
          >
            {showLabel && !indeterminate && (
              <span>{Math.round(percentage)}%</span>
            )}
          </motion.div>
        </div>

        {tooltip && !indeterminate && (
          <ProgressTooltip content={`${Math.round(percentage)}%`} />
        )}
      </div>
    );
  }
);

BaseProgressBar.displayName = "BaseProgressBar";

export default BaseProgressBar;