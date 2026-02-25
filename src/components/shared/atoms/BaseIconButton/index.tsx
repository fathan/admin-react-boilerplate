import { IconButton } from "@chakra-ui/react";

interface BaseIconButtonProps {
  ariaLabel: string;
  icon: React.ReactElement;
  onClick?: () => void;
  isDisabled?: boolean;
}

const BaseIconButton: React.FC<BaseIconButtonProps> = ({
  ariaLabel,
  icon,
  onClick,
  isDisabled
}) => {
  return (
    <>
      <IconButton
        aria-label={ariaLabel}
        disabled={isDisabled}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </>
  )
};

export default BaseIconButton;
