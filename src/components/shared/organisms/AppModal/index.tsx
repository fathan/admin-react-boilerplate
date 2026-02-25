import { Dialog, Portal } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface AppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full";
  placement?: "top" | "bottom" | "center";
  showCloseButton?: boolean;
  closeOnInteractOutside?: boolean;
  className?: string;
}

export const AppModal = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
  size = "md",
  placement = "center",
  showCloseButton = true,
  closeOnInteractOutside = true,
  className = "",
}: AppModalProps) => {
  return (
    <Dialog.Root
      open={open}
      size={size}
      placement={placement}
      onOpenChange={(e) => onOpenChange(e.open)}
      closeOnInteractOutside={closeOnInteractOutside}
    >
      <Portal>
        <Dialog.Backdrop className="bg-black/40 backdrop-blur-sm" />

        <Dialog.Positioner>
          <Dialog.Content className={`rounded-xl shadow-xl ${className}`}>
            {showCloseButton && (
              <Dialog.CloseTrigger className="absolute right-4 top-4" />
            )}

            {title && (
              <Dialog.Header>
                <Dialog.Title className="text-lg font-semibold">
                  {title}
                </Dialog.Title>
              </Dialog.Header>
            )}

            <Dialog.Body className="py-4">
              {children}
            </Dialog.Body>

            {footer && (
              <Dialog.Footer className="gap-2">
                {footer}
              </Dialog.Footer>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};