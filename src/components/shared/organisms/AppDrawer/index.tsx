import { Drawer, Portal } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface AppDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  placement?: "top" | "bottom" | "start" | "end";
  showCloseButton?: boolean;
  closeOnInteractOutside?: boolean;
  className?: string;
}

export const AppDrawer = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
  size = "md",
  placement = "end",
  showCloseButton = true,
  closeOnInteractOutside = true,
  className = "",
}: AppDrawerProps) => {
  return (
    <Drawer.Root
      open={open}
      size={size}
      placement={placement}
      onOpenChange={(e) => onOpenChange(e.open)}
      closeOnInteractOutside={closeOnInteractOutside}
    >
      <Portal>
        <Drawer.Backdrop className="bg-black/40 backdrop-blur-sm" />

        <Drawer.Positioner>
          <Drawer.Content className={`rounded-xl shadow-xl ${className}`}>
            {showCloseButton && (
              <Drawer.CloseTrigger className="absolute right-4 top-4" />
            )}

            {title && (
              <Drawer.Header>
                <Drawer.Title className="text-lg font-semibold">
                  {title}
                </Drawer.Title>
              </Drawer.Header>
            )}

            <Drawer.Body className="py-4">
              {children}
            </Drawer.Body>

            {footer && (
              <Drawer.Footer className="gap-2">
                {footer}
              </Drawer.Footer>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};