import { ReactNode, FC } from "react";
import { X } from "lucide-react"; // pastikan install lucide-react

export interface BaseCardProps {
  variant?: "elevated" | "outlined" | "flat";
  withHover?: boolean;
  clickable?: boolean;
  closable?: boolean;
  onClose?: () => void;
  paddingClass?: string;
  marginClass?: string;
  roundedClass?: string;
  shadowClass?: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

/* --------------------------------------------------
   Root Component
-------------------------------------------------- */

const BaseCard: FC<BaseCardProps> & {
  Header: FC<{
    children: ReactNode;
    className?: string;
    image?: ReactNode;
    badge?: ReactNode;
    closable?: boolean;
    onClose?: () => void;
  }>;
  Body: FC<{ children: ReactNode; className?: string; scrollable?: boolean; maxHeight?: string }>;
  Footer: FC<{ children: ReactNode; className?: string; justify?: "start" | "center" | "end" | "between" }>;
} = ({
  variant = "elevated",
  withHover = false,
  clickable = false,
  paddingClass = "p-4",
  marginClass = "m-2",
  roundedClass = "rounded-lg",
  shadowClass = "shadow-md",
  className = "",
  onClick,
  children,
}) => {
  const variantClass =
    variant === "elevated"
      ? `${shadowClass} border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800`
      : variant === "outlined"
      ? `border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800`
      : `bg-white dark:bg-gray-800`;

  const clickableClass = clickable
    ? `cursor-pointer transform transition-all duration-300 ${ withHover ? 'hover:shadow-xl hover:scale-[1.02]' : '' }`
    : "";

  return (
    <div
      className={`${variantClass} ${clickableClass} ${roundedClass} ${paddingClass} ${marginClass} ${className} relative`}
      onClick={clickable ? onClick : undefined}
    >
      {children}
    </div>
  );
};

/* --------------------------------------------------
   Slots Components
-------------------------------------------------- */

const CardHeader: FC<{
  children: ReactNode;
  className?: string;
  image?: ReactNode;
  badge?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
}> = ({ children, className = "", image, badge, closable = false, onClose }) => (
  <div className={`flex items-center justify-between mb-2 ${className}`}>
    <div className="flex items-center space-x-2">
      {image && <div>{image}</div>}
      <div>{children}</div>
    </div>

    <div className="flex items-center space-x-2">
      {badge && <div>{badge}</div>}
      {closable && onClose && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // jangan trigger card onClick
            onClose();
          }}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  </div>
);

const CardBody: FC<{ children: ReactNode; className?: string; scrollable?: boolean; maxHeight?: string }> = ({
  children,
  className = "",
  scrollable = false,
  maxHeight,
}) => (
  <div
    className={`${className} ${scrollable ? "overflow-auto" : ""}`}
    style={scrollable && maxHeight ? { maxHeight } : undefined}
  >
    {children}
  </div>
);

const CardFooter: FC<{ children: ReactNode; className?: string; justify?: "start" | "center" | "end" | "between" }> = ({
  children,
  className = "",
  justify = "end",
}) => {
  const justifyClass =
    justify === "start"
      ? "justify-start"
      : justify === "center"
      ? "justify-center"
      : justify === "between"
      ? "justify-between"
      : "justify-end";

  return <div className={`mt-2 flex ${justifyClass} ${className}`}>{children}</div>;
};

/* --------------------------------------------------
   Assign Slots
-------------------------------------------------- */

BaseCard.Header = CardHeader;
BaseCard.Body = CardBody;
BaseCard.Footer = CardFooter;

export default BaseCard;