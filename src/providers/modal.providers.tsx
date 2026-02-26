// organisms/ModalProvider.tsx
import { AppModal } from "@/components/shared/organisms/AppModal";
import { Button } from "@chakra-ui/react";
import { createContext, useContext, useState, ReactNode } from "react";

type ModalOptions = {
  title?: ReactNode;
  content?: ReactNode;
  confirmText?: string;
  confirmColor?: string;
  cancelText?: string;
  cancelColor?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type ModalContextType = {
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ModalOptions>({});

  const showModal = (opts: ModalOptions) => {
    setOptions(opts);
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title={options.title}
        footer={
          <>
            <Button
              variant="ghost"
              colorPalette={options.cancelColor ?? "gray"}
              onClick={() => {
                options.onCancel?.();
                hideModal();
              }}
            >
              {options.cancelText ?? "Cancel"}
            </Button>
            <Button
              colorPalette={options.confirmColor ?? "blue"}
              onClick={() => {
                options.onConfirm?.();
                hideModal();
              }}
            >
              {options.confirmText ?? "Confirm"}
            </Button>
          </>
        }
      >
        {options.content}
      </AppModal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }
  return context;
};