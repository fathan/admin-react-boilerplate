import { FC, ReactNode } from "react";
import { Link, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";

export interface BaseLinkProps extends ChakraLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  icon?: ReactNode; // icon optional
  iconPosition?: "left" | "right";
  variant?: "underline" | "plain";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const BaseLink: FC<BaseLinkProps> = ({
  href,
  children,
  external = false,
  icon,
  iconPosition = "left",
  variant = "plain",
  size = "md",
  className = "",
  ...rest
}) => {
  return (
    <Link
      href={href}
      variant={variant}
      className={`inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 ${className}`}
      {...rest}
    >
      {icon && iconPosition === "left" && <span className="mr-1">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="ml-1">{icon}</span>}
      {external && !icon && <ExternalLink className="w-3 h-3 ml-1 inline" />}
    </Link>
  );
};

export default BaseLink;