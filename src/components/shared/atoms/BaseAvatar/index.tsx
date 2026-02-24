import React, { CSSProperties } from "react";

export interface BaseAvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl" | number;
  status?: "online" | "offline" | "away";
  className?: string;
}

const sizeMap: Record<string, string> = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-lg",
  xl: "w-20 h-20 text-xl",
};

const BaseAvatar: React.FC<BaseAvatarProps> = ({
  src,
  name,
  size = "md",
  status,
  className = "",
}) => {
  const sizeClass = typeof size === "string" ? sizeMap[size] || sizeMap["md"] : "";
  const sizeStyle: CSSProperties =
    typeof size === "number" ? { width: size, height: size } : {};

  const initials: string =
    name
      ?.split(" ")
      .map((n) => n?.[0]?.toUpperCase() || "")
      .join("") || "?";

  const statusColor: string =
    status === "online"
      ? "bg-green-500"
      : status === "away"
      ? "bg-yellow-400"
      : status === "offline"
      ? "bg-red-500"
      : "";

  return (
    <div
      className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}
      style={sizeStyle}
    >
      <div className="rounded-full overflow-hidden w-full h-full">
        {src ? (
          <img
            src={src}
            alt={name || "Avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-600 text-white font-semibold">
            {initials}
          </span>
        )}
      </div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${statusColor}`}
        />
      )}
    </div>
  );
};

export default BaseAvatar;