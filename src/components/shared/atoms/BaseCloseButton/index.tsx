import { CloseButton } from "@chakra-ui/react";

interface BaseCloseButtonProps {
  variant: "outline" | "solid" | "ghost" | "subtle";
  size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
}

const BaseCloseButton: React.FC<BaseCloseButtonProps> = ({
  variant = "outline",
  size = "md",
}) => {
  return (
    <>
      <CloseButton
        variant={variant}
        size={size}
      />
    </>
  )
};

export default BaseCloseButton;
