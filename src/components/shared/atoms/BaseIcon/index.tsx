import React, {
  forwardRef,
  memo,
  ElementType,
  ReactElement,
  cloneElement,
} from "react";
import { AlertCircle } from "lucide-react";

/* --------------------------------------------------
   Helpers
-------------------------------------------------- */

// Tailwind text size → px mapping
const tailwindSizeMap: Record<string, number> = {
  "text-xs": 12,
  "text-sm": 14,
  "text-base": 16,
  "text-lg": 18,
  "text-xl": 20,
  "text-2xl": 24,
  "text-3xl": 30,
  "text-4xl": 36,
  "text-5xl": 48,
  "text-6xl": 60,
};

const extractTailwindSize = (className?: string): number | undefined => {
  if (!className) return undefined;

  const found = Object.keys(tailwindSizeMap).find((key) =>
    className.includes(key)
  );

  return found ? tailwindSizeMap[found] : undefined;
};

/* --------------------------------------------------
   Types
-------------------------------------------------- */

export interface BaseIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "stroke"> {
  icon?: ElementType;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  variant?: "outline" | "solid";
  asChild?: boolean;
  className?: string;
}

/* --------------------------------------------------
   Component
-------------------------------------------------- */

const BaseIcon = forwardRef<SVGSVGElement, BaseIconProps>(
  (
    {
      icon: Icon,
      size,
      color = "currentColor",
      strokeWidth = 2,
      variant = "outline",
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const ResolvedIcon = Icon ?? AlertCircle;

    // Auto detect Tailwind size jika size tidak diberikan
    const autoSize = size ?? extractTailwindSize(className) ?? 20;

    // Solid mode → hilangkan stroke
    const resolvedStroke =
      variant === "solid" ? undefined : strokeWidth;

    if (asChild && React.isValidElement(props.children)) {
      return cloneElement(props.children as ReactElement, {
        ref,
        className,
      });
    }

    return (
      <ResolvedIcon
        ref={ref}
        size={autoSize}
        color={color}
        strokeWidth={resolvedStroke}
        className={className}
        {...props}
      />
    );
  }
);

BaseIcon.displayName = "BaseIcon";

export default memo(BaseIcon);