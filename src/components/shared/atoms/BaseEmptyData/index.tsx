import {
  forwardRef,
  memo,
  ReactNode,
  ElementType,
} from "react";
import { Inbox } from "lucide-react";
import BaseIcon from "../BaseIcon";

/* -------------------------------------------------- */
/* Types */
/* -------------------------------------------------- */

export interface BaseEmptyDataProps {
  title?: string;
  description?: string;
  icon?: ElementType;
  illustration?: string | ReactNode;
  action?: ReactNode;
  loading?: boolean;
  animated?: boolean;
  fullHeight?: boolean;
  tableMode?: boolean;
  colSpan?: number;
  className?: string;
}

/* -------------------------------------------------- */
/* Skeleton */
/* -------------------------------------------------- */

const Skeleton = () => (
  <div className="flex flex-col items-center animate-pulse">
    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4" />
    <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    <div className="h-3 w-56 bg-gray-200 dark:bg-gray-700 rounded" />
  </div>
);

/* -------------------------------------------------- */
/* Component */
/* -------------------------------------------------- */

const BaseEmptyData = forwardRef<HTMLDivElement, BaseEmptyDataProps>(
  (
    {
      title = "Tidak ada data",
      description = "Data belum tersedia atau belum ditambahkan.",
      icon: Icon = Inbox,
      illustration,
      action,
      loading = false,
      animated = true,
      fullHeight = false,
      tableMode = false,
      colSpan = 100,
      className = "",
    },
    ref
  ) => {
    const content = (
      <div
        ref={ref}
        className={`
          flex flex-col items-center justify-center
          text-center px-6 py-10
          ${fullHeight ? "h-full min-h-[300px]" : ""}
          ${animated ? "transition-all duration-300 ease-in-out" : ""}
          ${className}
        `}
      >
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {/* Illustration / Icon */}
            <div
              className={`mb-4 ${
                animated ? "animate-fadeIn" : ""
              }`}
            >
              {illustration ? (
                typeof illustration === "string" ? (
                  <img
                    src={illustration}
                    alt="empty"
                    className="w-32 h-32 object-contain mx-auto opacity-80"
                  />
                ) : (
                  illustration
                )
              ) : (
                <BaseIcon
                  icon={Icon}
                  className="text-gray-400 dark:text-gray-500 text-6xl"
                  strokeWidth={1.5}
                />
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                {description}
              </p>
            )}

            {/* Action */}
            {action && <div className="mt-6">{action}</div>}
          </>
        )}
      </div>
    );

    if (tableMode) {
      return (
        <tr>
          <td colSpan={colSpan}>{content}</td>
        </tr>
      );
    }

    return content;
  }
);

BaseEmptyData.displayName = "BaseEmptyData";

export default memo(BaseEmptyData);