import { FC, ReactNode } from "react";
import {
  Badge,
  BadgeProps as ChakraBadgeProps
} from "@chakra-ui/react";

export interface BaseBadgeProps extends ChakraBadgeProps {
  colorPalette?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink";
  variant?: "solid" | "subtle" | "outline" | "surface" | "plain";
  size?: "xs" | "sm" | "md" | "lg";
  children?: ReactNode;
  asChild?: boolean;
}

/* --------------------------------------------------
   Root Component
-------------------------------------------------- */

const BaseBadge: FC<BaseBadgeProps> & {
  Icon: FC<{ children: ReactNode; className?: string }>;
} = ({
  colorPalette = "gray",
  variant = "subtle",
  size = "sm",
  asChild = false,
  children,
  ...rest
}) => {
  return (
    <Badge
      colorPalette={colorPalette}
      variant={variant}
      size={size}
      {...rest}
      display="inline-flex"
      alignItems="center"
      gap={1}
    >
      {children}
    </Badge>
  );
};

/* --------------------------------------------------
   Compound Slot: Icon
-------------------------------------------------- */

BaseBadge.Icon = ({ children, className = "", ...rest }) => (
  <span className={`inline-flex items-center ${className}`} {...rest}>{children}</span>
);

export default BaseBadge;