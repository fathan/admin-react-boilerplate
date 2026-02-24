import React, { FC, ReactNode } from "react";
import {
  Alert as ChakraAlert,
  AlertIndicator,
  AlertContent,
  AlertTitle,
  AlertDescription,
  CloseButton
} from "@chakra-ui/react";

/* -------------------------------------------------- */
/* Props Type */
/* -------------------------------------------------- */
export interface BaseAlertProps {
  /** Color palette of the component */
  colorPalette?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink";
  /** Status of the alert */
  status?: "info" | "warning" | "success" | "error" | "neutral";
  /** Variant style */
  variant?: "subtle" | "surface" | "outline" | "solid";
  /** Size of the alert */
  size?: "sm" | "md" | "lg";
  /** Render as different element */
  as?: React.ElementType;
  /** Use provided child element as root */
  asChild?: boolean;
  /** Remove default style */
  unstyled?: boolean;
  /** Inline display */
  inline?: boolean | "true" | "false";
  /** Optional title */
  title?: string;
  /** Optional description */
  description?: string;
  /** Show default icon indicator */
  showIcon?: boolean;
  /** Custom icon */
  icon?: ReactNode;
  /** Closable */
  closable?: boolean;
  /** Callback on close */
  onClose?: () => void;
}

/* -------------------------------------------------- */
/* BaseAlert Component */
/* -------------------------------------------------- */
const BaseAlert: FC<BaseAlertProps> = ({
  title,
  description,
  status = "info",
  variant = "subtle",
  size = "md",
  colorPalette = "gray",
  showIcon = true,
  icon,
  closable = false,
  onClose,
  as,
  asChild,
  unstyled,
  inline,
  ...props
}) => {
  return (
    <ChakraAlert.Root
      status={status}
      variant={variant}
      as={as}
      {...props}
      // Chakra UI v3 supports styling props, map inline / unstyled
      display={inline ? "inline-flex" : "flex"}
    >
      {showIcon && !icon && <AlertIndicator />}
      {icon && <AlertIndicator>{icon}</AlertIndicator>}

      <AlertContent>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </AlertContent>

      {closable && <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />}
    </ChakraAlert.Root>
  );
};

export default BaseAlert;