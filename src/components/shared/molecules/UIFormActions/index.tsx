import { Button, ButtonProps, Stack, StackProps } from "@chakra-ui/react";
import { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UIFormActionsAlign = "left" | "center" | "right" | "between";

export interface UIFormActionButton {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonProps["variant"];
  colorScheme?: ButtonProps["colorScheme"];
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loadingText?: string;
}

export interface UIFormActionsProps {
  /** Tombol-tombol aksi. Index 0 = kiri/pertama */
  actions: UIFormActionButton[];
  /** Alignment horizontal seluruh group tombol */
  align?: UIFormActionsAlign;
  /** Tambahan className Tailwind untuk wrapper */
  className?: string;
  /** Tambahan props Chakra Stack untuk wrapper */
  stackProps?: StackProps;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const alignMap: Record<UIFormActionsAlign, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between",
};

// ─── Component ────────────────────────────────────────────────────────────────

const UIFormActions = ({
  actions,
  align = "right",
  className = "",
  stackProps,
}: UIFormActionsProps) => {
  if (!actions || actions.length === 0) return null;

  return (
    <Stack
      direction="row"
      className={`w-full ${alignMap[align]} pt-4 border-t border-gray-100 ${className}`}
      {...stackProps}
    >
      {actions.map((action, idx) => (
        <Button
          key={idx}
          type={action.type ?? "button"}
          variant={action.variant ?? "solid"}
          colorScheme={action.colorScheme ?? "blue"}
          loading={action.isLoading}
          disabled={action.isDisabled}
          loadingText={action.loadingText}
          // leftIcon={action.leftIcon as any}
          // rightIcon={action.rightIcon as any}
          onClick={action.onClick}
          className="min-w-[100px]"
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );
};

export default UIFormActions;